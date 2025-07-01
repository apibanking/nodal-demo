import React, { useState, useEffect } from 'react';
import { Send, Paperclip, Smile, MoreHorizontal, Phone, Video, Users, CheckCircle } from 'lucide-react';

const NodalDemo = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessageAdded, setSuccessMessageAdded] = useState(false);

  const processingSteps = [
    "Fetching details from the HR portal...",
    "Transferring your details to HDFC Bank...",
    "Processing HDFC Bank account opening...",
    "Finalizing account setup..."
  ];

  useEffect(() => {
    const initialMessage = {
      id: 1,
      sender: 'Zia from Zoho',
      isBot: true,
      timestamp: '9:15 AM',
      content: {
        type: 'welcome',
        text: "👋 **Welcome to Deloitte!** \n\nContinuing with your onboarding, the next step is creating your Salary Account. We recommend opening your Salary Account with **HDFC Bank**.\n\n✅ **One-click account opening**\n• Just ensure that your HR portal has all personal details.\n\nWould you like to proceed?",
        showButtons: true,
        buttons: [
          { text: "Yes, open HDFC Bank Salary Account", action: "accept" },
          { text: "Maybe later", action: "decline" }
        ]
      }
    };

    setTimeout(() => {
      setMessages([initialMessage]);
    }, 1000);
  }, []);

  const addMessage = (message) => {
    setMessages(prev => [...prev, { ...message, id: Date.now() }]);
  };

  const addTypingIndicator = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  const handleButtonClick = (action) => {
    if (action === 'accept') {
      addMessage({
        sender: 'You',
        isBot: false,
        timestamp: '9:16 AM',
        content: { type: 'text', text: 'Yes, open HDFC Bank Salary Account' }
      });

      addTypingIndicator();
      setTimeout(() => {
        addMessage({
          sender: 'Zia from Zoho',
          isBot: true,
          timestamp: '9:17 AM',
          content: {
            type: 'processing',
            text: "🔄 **Processing your HDFC Bank account opening...**\n",
            showProcessing: true
          }
        });
        startProcessing();
      }, 2000);
    } else if (action === 'decline') {
      addMessage({
        sender: 'You',
        isBot: false,
        timestamp: '9:16 AM',
        content: { type: 'text', text: 'Maybe later' }
      });

      addTypingIndicator();
      setTimeout(() => {
        addMessage({
          sender: 'Zia from Zoho',
          isBot: true,
          timestamp: '9:16 AM',
          content: {
            type: 'text',
            text: "No problem! Feel free to reach out whenever you're ready to open your salary account. I'm here to help! 😊",
            showButtons: true,
            buttons: [{ text: "🔄 Start Over", action: "restart" }]
          }
        });
      }, 1500);
    } else if (action === 'restart') {
      setMessages([]);
      setSuccessMessageAdded(false);
      setProcessingStep(0);
      setIsProcessing(false);
      setTimeout(() => {
        const initialMessage = {
          id: 1,
          sender: 'Zia from Zoho',
          isBot: true,
          timestamp: '9:15 AM',
          content: {
            type: 'welcome',
            text: "👋 **Welcome to Deloitte!** \n\nContinuing with your onboarding, the next step is creating your Salary Account. We recommend opening your Salary Account with **HDFC Bank**.\n\n✅ **One-click account opening**\n• Just ensure that your HR portal has all personal details.\n\nWould you like to proceed?",
            showButtons: true,
            buttons: [
              { text: "Yes, open HDFC Bank Salary Account", action: "accept" },
              { text: "Maybe later", action: "decline" }
            ]
          }
        };
        setMessages([initialMessage]);
      }, 500);
    }
  };

  const startProcessing = () => {
    setIsProcessing(true);
    setProcessingStep(0);
  };

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProcessingStep(prev => {
          if (prev < processingSteps.length - 1) {
            return prev + 1;
          } else {
            setIsProcessing(false);
            return prev;
          }
        });
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [isProcessing, processingSteps.length]);

  useEffect(() => {
    if (!isProcessing && processingStep === processingSteps.length - 1 && !successMessageAdded) {
      setSuccessMessageAdded(true);
      setTimeout(() => {
        addMessage({
          sender: 'Zia from Zoho',
          isBot: true,
          timestamp: '9:18 AM',
          content: {
            type: 'success',
            text: "🎉 **Account Created Successfully!**\n\nYour HDFC Bank salary account has been opened successfully!\n\n💳 **Account Details:**\n• Account Number: ****-****-7892\n• IFSC Code: HDFC0001234\n• Account Type: Salary Account\n• Branch: Bangalore Corporate\n\n📱**Click Here to download the PayZapp app to access your account and make transactions**\n\n **Next Steps:**\nProceed with Onboarding: upload your photo for the Office ID Card*",
            showButtons: true,
            buttons: [{ text: "🔄 Start New Demo", action: "restart" }]
          }
        });
      }, 1000);
    }
  }, [isProcessing, processingStep, processingSteps.length, successMessageAdded]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      addMessage({
        sender: 'You',
        isBot: false,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        content: { type: 'text', text: inputValue }
      });
      setInputValue('');
      
      addTypingIndicator();
      setTimeout(() => {
        addMessage({
          sender: 'Zia from Zoho',
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          content: { 
            type: 'text', 
            text: "I'm here to help with your HDFC Bank salary account opening. Please use the buttons above to continue with the process! 😊" 
          }
        });
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const renderProcessingStatus = () => {
    return (
      <div className="mt-3 space-y-2">
        {processingSteps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 text-xs p-2 rounded ${
              index < processingStep || (index === processingStep && !isProcessing)
                ? 'bg-green-50 text-green-800'
                : index === processingStep
                ? 'bg-blue-50 text-blue-800'
                : 'bg-gray-50 text-gray-500'
            }`}
          >
            {index < processingStep || (index === processingStep && !isProcessing) ? (
              <CheckCircle className="w-3 h-3 text-green-600" />
            ) : index === processingStep ? (
              <div className="w-3 h-3 border border-blue-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <div className="w-3 h-3 border border-gray-300 rounded-full" />
            )}
            <span>{step}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderMessage = (message) => {
    const isBot = message.isBot;
    
    return (
      <div key={message.id} className={`flex gap-3 mb-4 ${isBot ? '' : 'flex-row-reverse'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isBot ? 'bg-purple-100' : 'bg-blue-100'
        }`}>
          {isBot ? (
            <span className="text-purple-600 text-sm font-bold">AI</span>
          ) : (
            <span className="text-blue-600 text-sm font-bold">You</span>
          )}
        </div>
        
        <div className={`max-w-md ${isBot ? '' : 'text-right'}`}>
          <div className={`inline-block p-3 rounded-lg ${
            isBot 
              ? 'bg-gray-100 text-gray-800' 
              : 'bg-blue-600 text-white'
          }`}>
            <div className="whitespace-pre-line text-sm">
              {message.content.text}
            </div>
            
            {message.content.showProcessing && renderProcessingStatus()}
            
            {message.content.showButtons && message.content.buttons && (
              <div className="mt-3 space-y-2">
                {message.content.buttons.map((button, index) => (
                  <button
                    key={index}
                    onClick={() => handleButtonClick(button.action)}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded transition-colors"
                  >
                    {button.text}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className={`text-xs text-gray-500 mt-1 ${isBot ? 'text-left' : 'text-right'}`}>
            <span className="font-medium">{message.sender}</span> • {message.timestamp}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-white flex flex-col max-w-4xl mx-auto border-x border-gray-200">
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
            <span className="text-white text-sm font-bold">AI</span>
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Zia from Zoho</h1>
            <p className="text-xs text-gray-500">AI Assistant • Stitch Banking Integration</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded">
            <Phone className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <Video className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <Users className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <MoreHorizontal className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(renderMessage)}
        
        {isTyping && (
          <div className="flex gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 text-sm font-bold">AI</span>
            </div>
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 p-2">
          <button className="p-2 hover:bg-gray-200 rounded">
            <Paperclip className="w-4 h-4 text-gray-600" />
          </button>
          
          <input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder-gray-500"
          />
          
          <button className="p-2 hover:bg-gray-200 rounded">
            <Smile className="w-4 h-4 text-gray-600" />
          </button>
          
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-2 text-center">
          Zia from Zoho can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
};

export default NodalDemo;