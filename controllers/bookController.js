import { v4 as uuidv4 } from 'uuid';
import { readBooks, writeBooks } from '../utils/fileHelpers.js';


// handle get all books with search and pagination
export async function getAllBooks(req, res) {
  try {
    const books = await readBooks();

    const { title, genre, author } = req.query;

    let filteredBooks = books;

    // filter by title
    if (title) {
      filteredBooks = filteredBooks.filter(book =>
        book.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    // filter by genre
    if (genre) {
      filteredBooks = filteredBooks.filter(book =>
        book.genre.toLowerCase().includes(genre.toLowerCase())
      );
    }

    // filter by author
    if (author) {
      filteredBooks = filteredBooks.filter(book =>
        book.author.toLowerCase().includes(author.toLowerCase())
      );
    }

    // pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = filteredBooks.slice(startIndex, endIndex);

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(filteredBooks.length / limit),
      totalItems: filteredBooks.length,
      itemsPerPage: limit,
    };

    res.status(200).json({
      message: "Books fetched successfully",
      books: results,
      pagination
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({
      message: 'Error fetching books',
      error: error.message
    });
  }
}

// handle get book by id for display details
export async function getBookById(req, res) {
  try {
    const books = await readBooks();
    const book = books.find(book => book.id === req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book details fetched successfully', book });
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Error fetching book', error: error.message });
  }
}

// handle create book by authorized user
export async function createBook(req, res) {
  try {
    const { title, author, genre, publishedYear } = req.body;
    if (!title || !author || !genre || !publishedYear)
      return res.status(400).json({ message: 'All fields are required' });

    const books = await readBooks();
    const newBook = {
      id: uuidv4(),
      title,
      author,
      genre,
      publishedYear,
      userId: req.user.id,
    };
    books.push(newBook);
    await writeBooks(books);
    res.status(201).json({ message: 'Book created successfully', newBook });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Error creating book', error: error.message });
  }
}

// handle update book by authorized user
export async function updateBook(req, res) {
  try {
    const books = await readBooks();
    const bookIndex = books.findIndex(book => book.id === req.params.id);

    if (bookIndex === -1)
      return res.status(404).json({ message: 'Book not found' });

    const book = books[bookIndex];
    if (book.userId !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    const updatedBook = {
      ...book,
      ...req.body,
    };

    books[bookIndex] = updatedBook;
    await writeBooks(books);
    res.status(200).json({ message: 'Book updated successfully', updatedBook });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Error updating book', error: error.message });
  }
}

// handle delete book by authorized user
export async function deleteBook(req, res) {
  try {
    const books = await readBooks();
    const book = books.find(book => book.id === req.params.id);

    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.userId !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    const filtered = books.filter(b => b.id !== req.params.id);
    await writeBooks(filtered);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
}
