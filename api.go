package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

// функция вывода страницы товара по его ID
func productHandle(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	product, err := getProductByID(id)
	if err != nil {
		http.Error(w, "Product not found", http.StatusNotFound)
		return
	}
	tmpl := template.Must(template.New("product.html").Funcs(template.FuncMap{"inc": inc}).ParseFiles("html/product.html"))
	tmpl.Execute(w, product)
}

// функция увеличения значения (нужна для слайдера на странице товара)
func inc(i int, value int) int {
	return i + value
}

// функция вывода товаров из БД в каталог по названию (поиск по названию)
func searchHandle(w http.ResponseWriter, r *http.Request) {
	title := r.URL.Query().Get("title")
	products, err := getProductsByTitle(title)
	if err != nil {
		http.Error(w, "Products not found", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}

// функция вывода товаров из БД в каталог
func catalogHandle(w http.ResponseWriter, r *http.Request) {
	psqlInfo := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		HOST, PORT, USER, PASSWORD, DBNAME,
	)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	products, err := getProductsForCatalog()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}
