
import { useEffect, useState } from "react";
import BookCards from "./BookCards";
import {generateBookTitles, getBookDetails} from './BookApis';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Main() {

    const [books, setBooks] = useState([])
    const [likes, setLikes] = useState([])
    const [dislikes, setDislikes] = useState([])
    const [neutrals, setNeutrals] = useState([])

    const updatePreference = (book_title, list_type, op_type) => {
        console.log({"fn": "updatePreference", "book_title": book_title, "list_type": list_type, "op_type": op_type})
        if (list_type === 'likes') {
            if (op_type === 'add') {
                if (!likes.includes(book_title)) {
                    setLikes([...likes, book_title]);
                }
                const newNeutrals = neutrals.filter((item) => item !== book_title);
                const newDislikes = dislikes.filter((item) => item !== book_title);
                setNeutrals(newNeutrals);
                setDislikes(newDislikes);
            }
            if (op_type === 'delete') {
                const newLikes = likes.filter((item) => item !== book_title)
                setLikes(newLikes)
                if (!neutrals.includes(book_title)) {
                    setNeutrals([...neutrals, book_title]);
                }
            }
        }

        if (list_type === 'dislikes') {
            if (op_type === 'add') {
                if (!dislikes.includes(book_title)) {
                    setDislikes([...dislikes, book_title]);
                }
                const newNeutrals = neutrals.filter((item) => item !== book_title);
                const newLikes = likes.filter((item) => item !== book_title);
                setNeutrals(newNeutrals);
                setLikes(newLikes);
            }
            if (op_type === 'delete') {
                const newDislikes = dislikes.filter((item) => item !== book_title)
                setLikes(newDislikes)
                if (!neutrals.includes(book_title)) {
                    setNeutrals([...neutrals, book_title]);
                }
            }
        }
        console.log({"fn": "updatePreference", "likes": likes, "dislikes": dislikes, "neutrals": neutrals})
    }

    const updateBooks = () => {
        setBooks([]);
        generateBookTitles(likes, dislikes, neutrals).then((titles) => {
                 getBookDetails(titles).then(
                    (books_) => {setBooks(books_);
                                 setNeutrals([...neutrals, books_.map((data) => data.title)]);})
                })
        console.log({"fn": "updateBooks", "likes": likes, "dislikes": dislikes, "neutrals": neutrals})
    }

    useEffect(() => {
        generateBookTitles(likes, dislikes, neutrals).then((titles) => {
            getBookDetails(titles).then(
                (books_) => {setBooks(books_);
                             setNeutrals(books_.map((data) => data.title));})
        })
        console.log({"fn": "useEffect", "likes": likes, "dislikes": dislikes, "neutrals": neutrals})
    }, [])

    return (<div>
                <BookCards books={books} updatePreference={updatePreference}/>
                <Box textAlign='center' marginTop="20px">
                    <Button variant='contained' onClick={updateBooks}>
                        Something else
                    </Button>
                </Box>
            </div>)
}

export default Main;