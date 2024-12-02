import App from "./app";

App.listen(App.get("PORT"), ()=>console.log(`Server is running at :${App.get("PORT")}`))