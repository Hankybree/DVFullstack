export const actions = {
    fetchData(context) {
        console.log("fetching data...");
        fetch("http://localhost:5000/artiklar/")
          .then(response => response.json())
          .then(result => {
            context.state.articles = result;
            console.log("Fetch done");
          })
    }
}