import React, { useState, useRef, useEffect } from 'react';
import './Luma.css';

const Luma = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Luma, your ocean AI guide. 🌊\n\nAsk me anything about Diel Vertical Migration and light pollution!"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "What is Diel Vertical Migration?",
    "How does artificial light affect marine life?",
    "What are the worst affected areas?"
  ];

  const getOfflineResponse = (message) => {
    const msg = message.toLowerCase();
    
    if (msg.includes('dvm') || msg.includes('vertical migration') || msg.includes('what is diel') || msg.includes('what is dvm')) {
      return "Diel Vertical Migration (DVM) is the largest migration of biomass on Earth! 🌊\n\nEvery single night, billions of marine organisms—from tiny zooplankton to larger fish—swim from the deep ocean (200-1000m) up to surface waters to feed under the cover of darkness. At dawn, they descend back to the depths to hide from predators.\n\nThis daily rhythm is crucial for the marine ecosystem and even affects Earth's carbon cycle by transporting carbon from surface to deep waters.";
    }
    
    if (msg.includes('light') || msg.includes('pollution') || msg.includes('affect') || msg.includes('disrupt')) {
      return "Artificial light from ships, coastal cities, and offshore platforms disrupts DVM in several critical ways: 💡\n\n1. **Prevents feeding**: Organisms avoid lit areas, missing crucial feeding opportunities\n2. **Alters timing**: Their internal biological clocks get confused\n3. **Increases predation**: Makes them more visible to predators\n4. **Changes depth**: They stay deeper than normal\n\nThis impacts everything from tiny zooplankton to large fish and whales.";
    }
    
    if (msg.includes('worst') || msg.includes('area') || msg.includes('where')) {
      return "The most affected areas are near major shipping routes, busy ports, and highly developed coastlines. 🗺️\n\n**Critical disruption zones:**\n• Mediterranean Sea (85% disruption)\n• South China Sea (88% disruption)\n• North Sea (72% disruption)\n• Waters around Hong Kong, Singapore, and major ports\n\nExplore these hotspots on our interactive map!";
    }
    
    return "That's a great question about ocean light pollution! 🌊 I'd love to help you explore this topic. Try asking me about what DVM is, how light affects it, or which areas are most impacted. You can also check out our interactive map for real-time data!";
  };

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call YOUR backend server (not Anthropic directly!)
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response
      }]);
    } catch (error) {
      console.error('Error:', error);
      // Fallback to offline response
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: getOfflineResponse(message)
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    sendMessage(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  return (
    <div className="ai-assistant">
      {/* Chat Bubble */}
      <div 
        className={`ai-bubble ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <div className="ai-avatar">
          <span className="pulse-ring" />
          <span className="avatar-icon">✨</span>
        </div>
        <div className="ai-label">Ask Luma</div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window">
          <div className="chat-header">
            <div className="chat-title">
              <span className="avatar-icon-small">✨</span>
              <span>Luma - Ocean AI Guide</span>
            </div>
            <button className="close-chat" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.role}-message`}>
                <div className="message-avatar">
                  {message.role === 'assistant' ? '✨' : '👤'}
                </div>
                <div className="message-content">
                  {message.content.split('\n').map((paragraph, i) => (
                    paragraph.trim() && <p key={i}>{paragraph}</p>
                  ))}
                  
                  {/* Show quick questions only in first message */}
                  {index === 0 && message.role === 'assistant' && (
                    <div className="quick-questions">
                      {quickQuestions.map((q, i) => (
                        <button
                          key={i}
                          className="quick-q"
                          onClick={() => handleQuickQuestion(q)}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="message assistant-message">
                <div className="message-avatar">✨</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              placeholder="Ask about ocean light pollution..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="send-button"
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
            >
              <span>→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Luma;