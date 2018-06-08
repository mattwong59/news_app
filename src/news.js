const url = "https://newsapi.org/v2/top-headlines?sources=bleacher-report&apiKey=f1a83c9b40c7495295b01c575bd1ef68";

export async function getNews() {
    let result = await fetch(url)
                .then(response => response.json());
    return result.articles;
}


