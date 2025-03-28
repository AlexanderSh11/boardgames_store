package main

import (
	"database/sql"
	"fmt"
	"html/template"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

const (
	HOST     = "localhost"
	PORT     = 5432
	USER     = "postgres"
	PASSWORD = "postgres"
	DBNAME   = "boardstore"
)

func main() {
	handleRequest()
	handleDataBase()
}

func handleRequest() {
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css"))))
	http.Handle("/images/", http.StripPrefix("/images/", http.FileServer(http.Dir("images"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js"))))
	http.Handle("/boardgames/", http.StripPrefix("/boardgames/", http.FileServer(http.Dir("boardgames"))))
	http.HandleFunc("/index/", indexPage)
	http.HandleFunc("/cart/", cartPage)
	http.HandleFunc("/favorites/", favoritesPage)
	http.HandleFunc("/login/", loginPage)
	http.HandleFunc("/api/games", catalogHandle)
	http.HandleFunc("/api/search", searchHandle)
	r := mux.NewRouter()
	r.HandleFunc("/product/{id:[0-9]+}", productHandle).Methods("GET")
	http.Handle("/", r)
}

func handleDataBase() {
	psqlInfo := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		HOST, PORT, USER, PASSWORD, DBNAME,
	)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	//проверка подключения
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Succesfully connected")

	http.ListenAndServe(":8000", nil)
}

// функция при переходе на главную страницу
func indexPage(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("html/index.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	tmpl.Execute(w, nil)
}

// функция при переходе на страницу корзины
func cartPage(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("html/cart.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	tmpl.Execute(w, nil)
}

// функция при переходе на страницу избранных товаров
func favoritesPage(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("html/favorites.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	tmpl.Execute(w, nil)
}

// функция при переходе на страницу авторизации
func loginPage(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("html/login.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	tmpl.Execute(w, nil)
}
