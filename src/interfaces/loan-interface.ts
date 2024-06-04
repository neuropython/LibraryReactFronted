export default interface Loan {
  loanId: number;
  user: {
    name: string | null;
    id: number;
    email_to_user: string;
  };
  book: {
    bookId: number;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    year: number;
    availableCopies: number;
    img: string;
    descryption: string;
  };
  loanDate: string;
  returnDate: string | null;
  status: boolean;
  bookId: number;
  userId: number;
  dueDate: string;
  issueDate: string;
}