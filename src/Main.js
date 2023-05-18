
import { useEffect, useState } from "react";
import BookCards from "./BookCards";
import {generateBookTitles, getBookDetails} from './BookApis';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { CircularProgress } from "@mui/material";

function Main({genres, setUpdatePref, likes, setLikes, dislikes, setDislikes, neutrals, setNeutrals}) {
    console.log(genres)

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    let n_books = 3;
    if (screenWidth <= 350) {
        n_books = 1;
    } else if (screenWidth <= 700) {
        n_books = 2;
    }

    const [books, setBooks] = useState([])

    const updatePreference = (book_title, list_type, op_type) => {
        // console.log({"fn": "updatePreference", "book_title": book_title, "list_type": list_type, "op_type": op_type})
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
        // console.log({"fn": "updatePreference", "likes": likes, "dislikes": dislikes, "neutrals": neutrals})
    }

    const updateBooks = () => {
        setBooks([]);
        generateBookTitles(likes, dislikes, neutrals, genres).then((titles) => {
                 getBookDetails(titles, n_books).then(
                    (books_) => {setBooks(books_);
                                 setNeutrals([...neutrals, books_.map((data) => data.title)]);})
                })
        // console.log({"fn": "updateBooks", "likes": likes, "dislikes": dislikes, "neutrals": neutrals})
    }

    useEffect(() => {
        generateBookTitles(likes, dislikes, neutrals, genres).then((titles) => {
            getBookDetails(titles, n_books).then(
                (books_) => {setBooks(books_);
                             setNeutrals(books_.map((data) => data.title));})
        })
        // console.log({"fn": "useEffect", "likes": likes, "dislikes": dislikes, "neutrals": neutrals})
    }, [])

    if (books.length === 0) {
        return (<div>
            <Box marginTop="50px" alignItems="center" justifyContent="center" textAlign="center">
                <CircularProgress />
            </Box>
        </div>)
    } else {
        return (<div>
                    <BookCards books={books} updatePreference={updatePreference}/>
                    <Box textAlign='center' marginTop="20px">
                        <Button variant='contained' onClick={updateBooks}>
                            Something else
                        </Button>
                        <Button variant='contained' sx={{marginLeft: '10px'}} onClick={() => setUpdatePref(true)}>
                            Update Preferences
                        </Button>
                    </Box>
                </div>)
    }
}

export default Main;