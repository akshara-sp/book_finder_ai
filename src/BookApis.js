import create_prompt from "./Prompts";

const { Configuration, OpenAIApi } = require("openai");

const getBookDetails = async (titles, n_books) => {
    const books = [];
    for (const i in titles) {
        try {
            const response = await fetch('https://www.googleapis.com/books/v1/volumes?' + new URLSearchParams({
                q: titles[i],
                key: ''}));
            const data = await response.json();
            const raw_book = data.items[0].volumeInfo;
            let image_url = './no_image.png'
            if ('title' in raw_book && 'description' in raw_book && 
                'imageLinks' in raw_book && 'thumbnail' in raw_book.imageLinks) {
                const book = {'title': raw_book.title,
                                'description': raw_book.description,
                                'image': raw_book.imageLinks.thumbnail,
                                'key': raw_book.title};
                // console.log(book);
                books.push(book);
            }
            if (books.length === n_books) {
                return books
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    // console.log(books)
    return books
};

function findTitles(data) {
    // console.log({"fn": "findTitles", "data": data})
    const titles = [];    
    for (const key in data) {
        if (key === 'title' && typeof data[key] === "string") {
            titles.push(data[key]);
        } else if (typeof data[key] === 'object') {
            titles.push(...findTitles(data[key]));
        }
    }
    return titles;
}

const generateBookTitles = async (likes, dislikes, neutrals, genres) => {

    const all_titles = [["Catcher in the Rye", "Lord of the Rings", "Sapiens"],
                 ["Broken Glass", "A Little Life", "The Tipping Point"],
                ["Coraline", "Days Without End", "Gone Girl"],
                ["Underland", "Brooklyn", "Night Watch"],
                ["Cloud Atlas", "Never Let Me Go", "Wolf Hall"]]
    try {
        // console.log(genres);
        const prompt = create_prompt(likes, dislikes, neutrals, genres);
        // console.log(prompt)
        // const i = Math.floor(Math.random() * 5);
        // return all_titles[i];
        // console.log("should never happen!")
        const configuration = new Configuration({
            apiKey: '',
        });
        const openai = new OpenAIApi(configuration);
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: prompt}],
            temperature: 0.4,
        });
        const results = JSON.parse(completion.data.choices[0].message.content);
        let titles = findTitles(results);
        if (titles.length > 2) {
            return titles
        } else if ('book1' in results && typeof results.book1 === "string" && 
                   'book2' in results && typeof results.book2 === "string" &&
                   'book3' in results && typeof results.book3 === "string") {
            titles = [results.book1, results.book2, results.book3]
        } else if ('books' in results && typeof results.books === "object" && 
                   typeof results.books[0] === "string") {
            titles = results.books
        }
        else {
            console.log("Failed to get book titles from openai!")
            console.log(completion.data)
            titles = ["Catcher in the Rye", "Lord of the Rings", "Sapiens"]
        }
        // console.log(titles);
        return titles;
    } catch (error) {
        console.error("Error:", error);
    }
};

export { generateBookTitles, getBookDetails }