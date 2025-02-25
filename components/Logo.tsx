import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex items-center justify-center pt-4">
      <Image
        src="/clera-logo.png?v=2"
        alt="Clera Logo"
        width={120}
        height={30}
        className="h-auto"
        priority
      />
    </div>
  )
} 