import * as React from 'react';
import BookCard from './BookCard';

export default function BookCards({books, updatePreference}) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            {books.map((book) => 
            {return <BookCard key={book.title} book={book} updatePreference={updatePreference}/>})}
        </div>
    );
}
