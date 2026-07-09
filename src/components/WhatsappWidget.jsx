import { FaWhatsapp } from "react-icons/fa"

const handleOpenChat = () => {
  const whatsappUrl = "https://wa.me/8801883141337?text=Hello%20Ahoron%20Support!";
  window.open(whatsappUrl, "_blank");
}

const WhatsappWidget = () => {

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={handleOpenChat}
        className="fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 bg-gradient-to-r from-teal-500 to-teal-600 animate-bounce"
        aria-label="Chat Support"
        title="Chat with support"
      >
        <div className="relative">
          <FaWhatsapp className="w-8 h-8 text-white" />
        </div>
      </button>
    </>
  )
}

export default WhatsappWidget