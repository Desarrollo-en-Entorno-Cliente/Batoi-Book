function getBookById(books, bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) throw new Error(`No se encontró un libro con id ${bookId}`);
    return book;
}

function getBookIndexById(books, bookId) {
    const index = books.findIndex(b => b.id === bookId);
    if (index === -1) throw new Error(`No se encontró un libro con id ${bookId}`);
    return index;
}

function bookExists(books, userId, moduleCode) {
    return books.some(b => b.userId === userId && b.moduleCode === moduleCode);
}

function booksFromUser(books, userId) {
    return books.filter(b => b.userId === userId);
}

function booksFromModule(books, moduleCode) {
    return books.filter(b => b.moduleCode === moduleCode);
}

function booksCheeperThan(books, price) {
    return books.filter(b => b.price <= price);
}

function booksWithStatus(books, status) {
    return books.filter(b => b.status === status);
}

function averagePriceOfBooks(books) {
    if (books.length === 0) return `0.00 €`;
    const total = books.reduce((sum, b) => sum + b.price, 0);
    return `${(total / books.length).toFixed(2)} €`;
}

function booksOfTypeNotes(books) {
    return books.filter(b => b.type === "notes");
}

function booksNotSold(books) {
    return books.filter(b => !b.sold);
}

function incrementPriceOfbooks(books, percentage) {
    return books.map(b => ({ ...b, price: b.price * (1 + percentage) }));
}

function getUserById(users, userId) {
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error(`No se encontró un usuario con id ${userId}`);
    return user;
}

function getUserIndexById(users, userId) {
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) throw new Error(`No se encontró un usuario con id ${userId}`);
    return index;
}

function getUserByNickName(users, nick) {
    const user = users.find(u => u.nick === nick);
    if (!user) throw new Error(`No se encontró un usuario con nick ${nick}`);
    return user;
}

function getModuleByCode(modules, moduleCode) {
    const module = modules.find(m => m.code === moduleCode);
    if (!module) throw new Error(`No se encontró un módulo con código ${moduleCode}`);
    return module;
}




export {
    getBookById,
    getBookIndexById,
    bookExists,
    booksFromUser,
    booksFromModule,
    booksCheeperThan,
    booksWithStatus,
    averagePriceOfBooks,
    booksOfTypeNotes,
    booksNotSold,
    incrementPriceOfbooks,
    getUserById,
    getUserIndexById,
    getUserByNickName,
    getModuleByCode 
  }