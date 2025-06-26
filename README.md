# PT. Praba Samudra Logistic - Frontend

This is the frontend application for PT. Praba Samudra Logistic, a freight forwarding and logistics company in Indonesia.

## Features

- Modern, responsive design built with Next.js and Tailwind CSS
- Online booking system for freight forwarding services
- Real-time shipment tracking
- Service information and company details
- Contact form and information

## Technologies Used

- **Next.js 14** - React framework with server-side rendering
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Server Components** - For improved performance and SEO
- **Next.js App Router** - For efficient routing

## Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/prabasamudra/logistics-frontend.git
cd logistics-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_URL=https://api.prabasamudralogistic.com
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
├── public/             # Static assets
│   └── images/         # Image files
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── booking/    # Booking pages
│   │   ├── tracking/   # Tracking pages
│   │   ├── services/   # Services pages
│   │   ├── about/      # About pages
│   │   ├── contact/    # Contact pages
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Home page
│   ├── components/     # React components
│   │   ├── layout/     # Layout components
│   │   └── ui/         # UI components
│   ├── lib/            # Utility functions and libraries
│   └── types/          # TypeScript type definitions
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```

## Deployment

This application can be deployed to any hosting service that supports Node.js applications. We recommend using Vercel for the best experience with Next.js.

### Deploying to Vercel

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Configure environment variables
4. Deploy

## API Integration

This frontend application communicates with the PT. Praba Samudra Logistic backend API. The API endpoints are defined in the `.env.local` file.

## Browser Support

The application is compatible with all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contact

For support or inquiries, contact:

- Email: pt.prabasamudralogistics@gmail.com
- Phone: +62 81806000469 