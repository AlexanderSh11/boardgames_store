package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
)

type Product struct {
	ID                 int      `json:"id"`
	Title              string   `json:"title"`
	Description        string   `json:"description"`
	LongDescription    string   `json:"long_description"`
	ImagePath          string   `json:"img"`
	Age                string   `json:"age"`
	Time               string   `json:"time"`
	Players            string   `json:"players"`
	Price              float64  `json:"price"`
	RulesPath          string   `json:"rules"`
	AvailabilityStatus string   `json:"status"`
	ImagePathes        []string `json:"imgs"`
	Components         []string `json:"components"`
}

// получение всех товаров из БД для каталога с сортировкой по цене
func getProductsForCatalog() ([]Product, error) {
	psqlInfo := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		HOST, PORT, USER, PASSWORD, DBNAME,
	)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	rows, err := db.Query("SELECT p.id, p.name, p.price, p.description, pi.img_dir, p.age, p.time, p.players FROM products p LEFT JOIN (SELECT product_id, img_dir, ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY id) AS rn FROM product_images) pi ON p.id = pi.product_id AND pi.rn = 1 ORDER BY p.price")
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	products := []Product{}

	for rows.Next() {
		p := Product{}
		err := rows.Scan(&p.ID, &p.Title, &p.Price, &p.Description, &p.ImagePath, &p.Age, &p.Time, &p.Players)
		if err != nil {
			fmt.Println(err)
			continue
		}
		products = append(products, p)
	}
	return products, nil
}

// получение товара по ID
func getProductByID(ID string) (Product, error) {
	psqlInfo := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		HOST, PORT, USER, PASSWORD, DBNAME,
	)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	rows, err := db.Query("select p.id, p.name, p.price, p.long_description, p.age, p.time, p.players, p.rules_pdf_dir, p.availability_status, p.components, pi.img_dir from products p left join product_images pi on p.id = pi.product_id where p.id=$1", ID)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	product := Product{}
	var components json.RawMessage
	for rows.Next() {
		var Image string
		err = rows.Scan(&product.ID, &product.Title, &product.Price, &product.LongDescription, &product.Age, &product.Time, &product.Players, &product.RulesPath, &product.AvailabilityStatus, &components, &Image)
		if err != nil {
			fmt.Println(err)
		}
		product.ImagePathes = append(product.ImagePathes, Image)
	}
	if err := json.Unmarshal(components, &product.Components); err != nil {
		return product, nil
	}
	return product, nil
}

// получение товара в каталоге по названию
func getProductsByTitle(title string) ([]Product, error) {
	psqlInfo := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		HOST, PORT, USER, PASSWORD, DBNAME,
	)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	rows, err := db.Query("SELECT p.id, p.name, p.price, p.description, pi.img_dir, p.age, p.time, p.players FROM products p LEFT JOIN (SELECT product_id, img_dir, ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY id) AS rn FROM product_images) pi ON p.id = pi.product_id AND pi.rn = 1 where p.name ilike $1", "%"+title+"%")
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	products := []Product{}

	for rows.Next() {
		p := Product{}
		err := rows.Scan(&p.ID, &p.Title, &p.Price, &p.Description, &p.ImagePath, &p.Age, &p.Time, &p.Players)
		if err != nil {
			fmt.Println(err)
			continue
		}
		products = append(products, p)
	}
	return products, nil
}
