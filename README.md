# 🕯️ Transaction Séance

Invoke the spirits of forgotten transactions on Base blockchain. A Farcaster Mini App that transforms failed transactions into unique ghost NFTs.

## 🚀 Getting Started

### Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Configure your environment variables in `.env.local`:

```bash
# Etherscan API Key (required)
NEXT_PUBLIC_ETHERSCAN_API_KEY=your_api_key_here

# Treasury wallet address (receives invocation fees)
NEXT_PUBLIC_TREASURY_ADDRESS=0xe93f5c92319959b75E4e564E185c7Ab1893bb07D

# Invocation fee in ETH
NEXT_PUBLIC_INVOCATION_FEE=0.001

# Farcaster Frame URL (for development, use ngrok)
NEXT_PUBLIC_BASE_URL=https://your-ngrok-url.ngrok-free.app
```

### Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## ⚙️ Configuration

### Changing the Invocation Fee

To change the fee users pay to invoke a ghost:

1. Edit `.env.local`:
```bash
NEXT_PUBLIC_INVOCATION_FEE=0.005  # Change to your desired fee in ETH
```

2. Restart the development server

The fee will automatically update in:
- Transaction amount sent to treasury
- Button text displaying the fee

### Changing the Treasury Address

To change where fees are sent:

1. Edit `.env.local`:
```bash
NEXT_PUBLIC_TREASURY_ADDRESS=0xYourNewAddress...
```

2. Restart the development server

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
