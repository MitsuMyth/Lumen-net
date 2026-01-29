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

    // DVM Questions
    if (msg.includes('dvm') || msg.includes('vertical migration') || msg.includes('what is diel') || msg.includes('what is dvm')) {
      return "Diel Vertical Migration (DVM) is the largest migration of biomass on Earth! 🌊\n\nEvery single night, billions of marine organisms—from tiny zooplankton to larger fish—swim from the deep ocean (200-1000m) up to surface waters to feed under the cover of darkness. At dawn, they descend back to the depths to hide from predators.\n\nThis daily rhythm is crucial for the marine ecosystem and even affects Earth's carbon cycle by transporting carbon from surface to deep waters.";
    }

    // Light Pollution Impact
    if (msg.includes('light') || msg.includes('pollution') || msg.includes('affect') || msg.includes('disrupt')) {
      return "Artificial light from ships, coastal cities, and offshore platforms disrupts DVM in several critical ways: 💡\n\n1. **Prevents feeding**: Organisms avoid lit areas, missing crucial feeding opportunities\n2. **Alters timing**: Their internal biological clocks get confused\n3. **Increases predation**: Makes them more visible to predators\n4. **Changes depth**: They stay deeper than normal\n\nThis impacts everything from tiny zooplankton to large fish and whales.";
    }

    // Geographic Areas
    if (msg.includes('worst') || msg.includes('area') || msg.includes('where') || msg.includes('location') || msg.includes('mediterranean') || msg.includes('lebanon')) {
      return "The most affected areas are near major shipping routes, busy ports, and highly developed coastlines. 🗺️\n\n**Critical disruption zones:**\n• Mediterranean Sea (85% disruption)\n• South China Sea (88% disruption)\n• North Sea (72% disruption)\n• Lebanon's coast (90% DVM suppression in Beirut)\n• Waters around Hong Kong, Singapore, and major ports\n\nExplore these hotspots on our interactive map!";
    }

    // Zooplankton
    if (msg.includes('zooplankton') || msg.includes('krill') || msg.includes('copepod')) {
      return "Zooplankton are tiny drifting animals that form the base of the marine food web! 🦐\n\n**Key Facts:**\n• Include copepods, krill, and larval fish\n• Most abundant animal biomass on Earth\n• Primary participants in DVM\n• Crucial food source for fish, whales, and seabirds\n• Transport 1-2 gigatons of carbon annually\n\nLight pollution causes them to avoid surface waters, disrupting their feeding on phytoplankton and impacting the entire food chain.";
    }

    // Phytoplankton
    if (msg.includes('phytoplankton') || msg.includes('algae') || msg.includes('plankton')) {
      return "Phytoplankton are microscopic plants that form the foundation of ocean life! 🌱\n\n**Why They Matter:**\n• Produce 50% of Earth's oxygen\n• Base of the marine food web\n• Consumed by zooplankton during DVM\n• Critical for carbon sequestration\n\nWhen artificial light disrupts DVM, zooplankton can't feed on surface phytoplankton efficiently, causing blooms and ecosystem imbalances.";
    }

    // Carbon Cycle
    if (msg.includes('carbon') || msg.includes('sequestration') || msg.includes('climate') || msg.includes('co2')) {
      return "DVM is a critical component of Earth's carbon cycle! 🌍\n\n**The Biological Carbon Pump:**\n1. Phytoplankton photosynthesize, absorbing CO₂\n2. Zooplankton eat phytoplankton at night\n3. They descend to deep waters during the day\n4. Carbon is released at depth through respiration and waste\n5. This carbon remains sequestered for centuries\n\n**Impact:** DVM transports 1-2 gigatons of carbon annually. Light pollution reducing DVM by 35% significantly affects climate regulation.";
    }

    // Shipping & Maritime
    if (msg.includes('ship') || msg.includes('vessel') || msg.includes('maritime') || msg.includes('cargo')) {
      return "Shipping is a major contributor to marine light pollution! 🚢\n\n**The Problem:**\n• 50,000+ commercial vessels operate nightly\n• High-intensity deck lighting extends 2km underwater\n• Major shipping routes show 70-90% DVM suppression\n\n**Solutions:**\n• Dim non-essential deck lighting\n• Use red/amber lights instead of white/blue\n• Shield lights to point downward\n• Adopt 'dark ship' protocols in sensitive areas\n\nEven small changes can significantly reduce impact!";
    }

    // Beer-Lambert Law
    if (msg.includes('beer') || msg.includes('lambert') || msg.includes('attenuation') || msg.includes('penetration')) {
      return "The Beer-Lambert Law describes how light penetrates water! 🔬\n\n**The Physics:**\nI(z) = I₀ × e^(-k × z)\n\nWhere:\n• I(z) = light intensity at depth z\n• I₀ = surface light intensity\n• k = attenuation coefficient\n• z = depth in meters\n\n**What This Means:**\nLight intensity decreases exponentially with depth. In clear ocean water, artificial light can still suppress DVM at 200-400m depth. Turbid water attenuates light faster but coastal areas are still heavily impacted.";
    }

    // Marine Species
    if (msg.includes('fish') || msg.includes('whale') || msg.includes('dolphin') || msg.includes('species') || msg.includes('animals')) {
      return "Many marine species depend on DVM for survival! 🐟\n\n**DVM Participants:**\n• Copepods & krill (primary migrators)\n• Lanternfish (most abundant fish)\n• Squid and jellyfish\n• Larval fish and crustaceans\n\n**Predators Dependent on DVM:**\n• Tuna, mackerel, and commercial fish\n• Whales (feed on krill at specific depths)\n• Seabirds\n• Sharks\n\nDisrupting DVM affects 90% of global fish stocks and the entire marine food web.";
    }

    // Ocean Conservation
    if (msg.includes('conservation') || msg.includes('protect') || msg.includes('solution') || msg.includes('help')) {
      return "We can take action to protect the ocean's nightlife! ✨\n\n**Individual Actions:**\n• Reduce coastal light pollution at home\n• Support marine conservation organizations\n• Spread awareness about DVM\n• Advocate for ocean-friendly policies\n\n**Industry Solutions:**\n• Maritime: Adopt dark ship protocols\n• Coastal: Install ocean-friendly lighting\n• Offshore: Minimize platform illumination\n• Policy: Establish marine dark zones\n\nEvery action counts in protecting this critical ecosystem process!";
    }

    // Coastal Development
    if (msg.includes('coastal') || msg.includes('city') || msg.includes('development') || msg.includes('urban')) {
      return "Coastal development is a growing source of marine light pollution! 🏙️\n\n**The Impact:**\n• 60% of coastal cities exceed safe light thresholds\n• Light extends 5-10km offshore\n• Affects critical nearshore habitats\n• Disrupts spawning and juvenile fish\n\n**Solutions:**\n• Use warm-colored (amber/red) street lighting\n• Shield lights to prevent ocean-ward spill\n• Implement curfews for non-essential lighting\n• Create 'dark beach' zones\n\nCoastal communities can significantly reduce their impact with thoughtful lighting design.";
    }

    // Biodiversity
    if (msg.includes('biodiversity') || msg.includes('ecosystem') || msg.includes('food web') || msg.includes('food chain')) {
      return "DVM is fundamental to marine biodiversity! 🌊\n\n**Ecosystem Connections:**\n• Supports 90% of commercial fish stocks\n• Feeds whales, dolphins, and seabirds\n• Maintains predator-prey balance\n• Distributes nutrients vertically\n• Connects surface and deep-sea ecosystems\n\n**When Light Disrupts DVM:**\n• Zooplankton populations decline\n• Fish lack food sources\n• Predators struggle to find prey\n• Ecosystem collapse in heavily lit areas\n\nProtecting DVM means protecting ocean biodiversity.";
    }

    // Water Quality
    if (msg.includes('water quality') || msg.includes('clarity') || msg.includes('turbidity') || msg.includes('clean water')) {
      return "Water quality affects how light pollution impacts DVM! 💧\n\n**Key Factors:**\n• Clear water: Light penetrates deeper (400m+)\n• Turbid water: Light absorbed faster\n• Coastal waters often more turbid\n• Open ocean waters clearer\n\n**Why It Matters:**\nEven in turbid coastal waters, artificial light significantly disrupts DVM in the upper 50-100m where most biological activity occurs. Clear offshore waters can see impacts down to 400m depth.";
    }

    // Check if question is unrelated to marine/ocean topics
    const marineKeywords = ['ocean', 'sea', 'marine', 'water', 'fish', 'whale', 'ship', 'coast', 'underwater', 'dvm', 'plankton', 'ecosystem', 'biodiversity', 'pollution', 'light', 'migration', 'depth'];
    const hasMarineKeyword = marineKeywords.some(keyword => msg.includes(keyword));

    if (!hasMarineKeyword) {
      return "I'm specialized in marine light pollution, ocean ecosystems, and Diel Vertical Migration. 🌊\n\nI can help you with questions about:\n• DVM and how it works\n• Light pollution's impact on marine life\n• Ocean carbon cycle\n• Marine species and ecosystems\n• Conservation solutions\n• Shipping and coastal impacts\n\nPlease ask me a question related to these ocean topics!";
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