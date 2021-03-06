const router = require('express').Router();
const Book = require('../../../models/Book');
// Every route declared in this index.js
// will have /api/books prepended automatically to every route declaration
// Getting all books information
router.get('/', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (e) {
        res.json(e);
    }
});

// Finding a book by its ID
router.get('/:bookId', async (req, res) => {
    try {
        // findByPk means find by primary key which is the ID we created
        const book = await Book.findByPk(req.params.bookId);
        // respond back with book that we found
        res.json(book);
    } catch (e) {
        res.json(e);
    }
})

// Updating
router.patch('/:bookId', async (req, res) => {
    const {
        title,
        author,
        isbn,
        pages,
        edition,
        isPaperback,
    } = req.body;
    try {
        // update takes two params
        // 1. what columns you want to update and what you want to update them to
        // 2. an object for which rows you want to update
        await Book.update(
            {
                title,
                author,
                isbn,
                pages,
                edition,
                isPaperback,
            },
            {
                where: {
                    id: req.params.bookId
                }
            }
            );
            const updatedBook = await Book.findByPk(req.params.bookId)
            res.json(updatedBook);
    } catch (e) {
        res.json(e);
    }
});

router.post('/', async (req, res) => {
const { title, author } = req.body;
try {
    const newBook = await Book.create({
    title,
    author,
    isPaperback: true,
    });
    res.json(newBook);
} catch (e) {
    console.log('L:12', e);
    res.json(e);
}
});

// /api/books/seed
router.post('/seed', async (req, res) => {
const booksToSave = [
    {
    title: 'Datastructures and Algorithms in JavaScript',
    author: 'Lorraine Granger',
    isbn: '1',
    pages: 100,
    edition: 1,
    isPaperback: true,
    },
    {
    title: 'You dont know JS',
    author: 'Kyle Simpson',
    isbn: '2',
    pages: 100,
    edition: 1,
    isPaperback: true,
    },
    {
    title: 'NFT for idiots',
    author: 'Ricky Rice',
    isbn: '3',
    pages: 100,
    edition: 1,
    isPaperback: true,
    },
    {
    title: 'The Outsiders',
    author: 'S.E Hinton',
    isbn: '4',
    pages: 100,
    edition: 1,
    isPaperback: true,
    },
    {
    title: 'The Catcher in the Rye',
    author: 'J.D Salinger',
    isbn: '5',
    pages: 100,
    edition: 1,
    isPaperback: true,
    },
];

    try {
        const result = await Book.bulkCreate(booksToSave);
        res.json(result);
    } catch (e) {
        res.json(e);
    };
});

// DELETE ROUTE

router.delete('/:bookId', async (req, res) => {
    try {
        // .destory takes one param which is an object
        const deletedBook =  Book.destroy({
            where: {
                id: req.params.bookId
            }
        });
        res.json(deletedBook);
    } catch (e) {
        res.json(e);
    }
})

module.exports = router;
