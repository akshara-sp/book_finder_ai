import * as React from 'react';
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';


export default function BookCard({book, updatePreference}) {
    const [likeColor, setLikeColor] = useState("action");
    const [dislikeColor, setDislikeColor] = useState("action");

    const update_prefs_like = () => {
        if (likeColor === "action") {
            updatePreference(book.title, "likes", "add")
            setLikeColor("primary")
            setDislikeColor("action")
        } else if (likeColor === "primary") {
            updatePreference(book.title, "likes", "delete")
            setLikeColor("action")
        }
    }

    const update_prefs_dislike = () => {
        if (dislikeColor === "action") {
            updatePreference(book.title, "dislikes", "add")
            setDislikeColor("primary")
            setLikeColor("action")
        } else if (dislikeColor === "primary") {
            updatePreference(book.title, "dislikes", "delete")
            setDislikeColor("action")
        }
    }

    return (
        <Card key={book.title} sx={{ marginRight: '15px', marginTop: '100px', width: 300, height: 400}}>
            <CardMedia
                component="img"
                sx={{ height: 200, width: 300, objectFit: 'contain'}}
                image={book.image}
                title={book.title}
            />
            <CardContent sx={{height: 150, width: 300}}>
                <Typography gutterBottom variant="body2" component="div">
                    <strong>{book.title}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Synopsis: {book.description.substring(0, 150)} ...
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ width: '100%', justifyContent: 'flex-end'}}>
                <IconButton aria-label="like this" onClick={update_prefs_like}>
                    <ThumbUpIcon color={likeColor} />
                </IconButton>
                <IconButton aria-label="not like this" onClick={update_prefs_dislike}>
                    <ThumbDownIcon color={dislikeColor} />
                </IconButton>
                <IconButton aria-label="Add to bookmark" sx={{marginLeft: 'auto'}}>
                    <BookmarkAddIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}