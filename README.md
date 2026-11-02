# BookNook

BookNook is a small online library run by its readers. Add a book, borrow a book, return a book.

**Live site:** https://book-nook-client-chi.vercel.app

**Server repository:** https://github.com/Mohaiminul69/book-nook-server

## Features

- **Share your books:** add a book with its title, author, category, description, number of copies and a cover image uploaded to imgbb. It appears in All Books and New Arrivals straight away.
- **Browse the catalogue:** see every book in a three-column grid, filter by Fiction, Science, History, Kids or Others, and open any title to see who added it and how many copies are left.
- **Borrow for seven days:** borrow a book from its details page. Copies go down by one, the same book can't be borrowed twice at the same time, and the button turns into "Not Available" when no copies are left.
- **Track and return loans:** My Borrows lists every book you have out with its borrow date, return date and days left. One click returns it and puts the copy back on the shelf.
- **Manage your own books:** My Books shows only the books you added. Edit them in a pre-filled form or delete them after a confirmation step.
- **Secure accounts:** register with email and password or continue with Google. Private pages stay protected after a reload, and every write to the API is checked with a JWT.
- **Responsive design:** a newspaper-inspired layout that works on mobile, tablet and desktop, with toast messages for every success and error.

## Pages

| Route         | Access  | Description                                      |
| ------------- | ------- | ------------------------------------------------ |
| `/`           | Public  | Banner slider, new arrivals, how borrowing works |
| `/books`      | Public  | All books with a category filter                 |
| `/books/:id`  | Private | Book details and the borrow modal                |
| `/add-book`   | Private | Form to add a book with a cover upload           |
| `/my-books`   | Private | Books you added, with edit and delete            |
| `/my-borrows` | Private | Books you borrowed, with return                  |
| `/profile`    | Private | Your account and reading stats                   |
| `/login`      | Public  | Email and password login, Google login           |
| `/register`   | Public  | Registration with password rules                 |

## Tech Stack

- **Framework:** Next.js (App Router), React, JavaScript
- **UI:** Tailwind CSS, shadcn/ui, Swiper.js, Sonner
- **Authentication:** Better Auth with the MongoDB adapter and the JWT plugin
- **Database:** MongoDB
- **Image hosting:** imgbb
- **Backend:** Express.js API (see the server repository)
- **Deployment:** Vercel

## Running Locally

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/Mohaiminul69/book-nook-client.git
   cd book-nook-client
   npm install
   ```

2. Create a `.env.local` file in the project root:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   DB_NAME=booknook
   BETTER_AUTH_SECRET=a_long_random_string
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=your_server_url
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXT_PUBLIC_IMGBB_KEY=your_imgbb_api_key
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser.
