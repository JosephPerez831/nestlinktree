import React, { useState } from 'react';

function App() {
  const [isDemoMode, setIsDemoMode] = useState(true);

  const [profile, setProfile] = useState({
    name: "Joseph Perez",
    role: "Software Developer",
    bio: "Building beautiful and functional web experiences.",
    avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, avatarUrl: imageUrl });
    }
  };

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(profile.name);

  const [isEditingRole, setIsEditingRole] = useState(false);
  const [tempRole, setTempRole] = useState(profile.role);

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [tempBio, setTempBio] = useState(profile.bio);

  const handleSaveName = () => {
    setProfile({ ...profile, name: tempName });
    setIsEditingName(false);
  };

  const handleSaveRole = () => {
    setProfile({ ...profile, role: tempRole });
    setIsEditingRole(false);
  };

  const handleSaveBio = () => {
    setProfile({ ...profile, bio: tempBio });
    setIsEditingBio(false);
  };

  const [tabs, setTabs] = useState([
    { id: 'main', name: 'Main Links', color: 'bg-yellow-200' },
    { id: 'socials', name: 'Socials', color: 'bg-pink-200' },
    { id: 'projects', name: 'Projects', color: 'bg-green-200' },
    { id: 'music', name: 'Playlists', color: 'bg-blue-200' }
  ]);
  const [activeTab, setActiveTab] = useState('main');
  
  const [isAddingTab, setIsAddingTab] = useState(false);
  const [newTabName, setNewTabName] = useState('');

  const colors = ['bg-yellow-200', 'bg-pink-200', 'bg-green-200', 'bg-blue-200', 'bg-purple-200'];

  const handleAddTab = (e) => {
    e.preventDefault();
    if (!newTabName.trim()) return;
    const newId = 'tab-' + Date.now();
    const randomColor = colors[tabs.length % colors.length];
    setTabs([...tabs, { id: newId, name: newTabName.trim(), color: randomColor }]);
    setActiveTab(newId);
    setNewTabName('');
    setIsAddingTab(false);
  };

  const handleDeleteTab = (tabId, e) => {
    e.stopPropagation();
    if(tabs.length === 1) return;
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);
    if(activeTab === tabId) {
      setActiveTab(newTabs[0].id);
    }
  };

  const [links, setLinks] = useState([
    {
      id: 1,
      tabId: 'main',
      title: "Personal Portfolio",
      url: "https://example.com/",
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=64&auto=format&fit=crop",
    },
    {
      id: 2,
      tabId: 'socials',
      title: "GitHub",
      url: "https://github.com/JosephPerez831",
      imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=64&auto=format&fit=crop",
    },
    {
      id: 3,
      tabId: 'socials',
      title: "LinkedIn",
      url: "https://linkedin.com/in/josephperez831",
      imageUrl: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=64&auto=format&fit=crop",
    },
    {
      id: 4,
      tabId: 'main',
      title: "My Resume",
      url: "https://docs.google.com/document/d/1gB0os7bc-W1cOFs-V0UBUntkI99-iPwfBOvC_EZkCUc/edit?usp=sharing",
      imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=64&auto=format&fit=crop",
    },
    {
      id: 5,
      tabId: 'main',
      title: "Contact Me",
      url: "https://example.com/contact",
      imageUrl: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=64&auto=format&fit=crop",
    },
    {
      id: 6,
      tabId: 'projects',
      title: "Weather App",
      url: "https://example.com/weather",
      imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=64&auto=format&fit=crop",
    },
    {
      id: 7,
      tabId: 'projects',
      title: "E-Commerce Clone",
      url: "https://example.com/shop",
      imageUrl: "https://images.unsplash.com/photo-1472851294608-062e1c94d932?q=80&w=64&auto=format&fit=crop",
    },
    {
      id: 8,
      tabId: 'music',
      title: "Coding Focus Playlist",
      url: "https://spotify.com/",
      imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=64&auto=format&fit=crop",
    },
    {
      id: 9,
      tabId: 'music',
      title: "My Favorite Podcast",
      url: "https://example.com/podcast",
      imageUrl: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=64&auto=format&fit=crop",
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newLink, setNewLink] = useState({ title: '', url: '', imageUrl: '' });

  const handleAddLink = (e) => {
    e.preventDefault();
    if (!newLink.title || !newLink.url) return;
    
    setLinks([
      ...links,
      {
        id: Date.now(),
        tabId: activeTab,
        title: newLink.title,
        url: newLink.url,
        imageUrl: newLink.imageUrl || "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=64&auto=format&fit=crop" 
      }
    ]);
    
    setNewLink({ title: '', url: '', imageUrl: '' });
    setShowAddForm(false);
  };

  const currentTabLinks = links.filter(link => link.tabId === activeTab);
  const displayLinks = isDemoMode ? links : currentTabLinks;
  const getTabColor = (tabId) => tabs.find(t => t.id === tabId)?.color || 'bg-yellow-200';

  return (
    <div className="min-h-screen flex flex-col md:flex-row pb-20 md:pb-0 font-sans" style={{ backgroundColor: '#fdfbf7', backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      
      <div className="fixed top-4 right-4 z-[100] flex items-center gap-3">
        {isDemoMode && (
          <div className="hidden md:flex items-center gap-2 text-slate-800 font-bold bg-white/80 backdrop-blur px-4 py-2 rounded shadow-sm border border-slate-200 animate-pulse">
            <span>See how my feature changes it</span>
            <span className="text-xl">👉</span>
          </div>
        )}
        <button 
          onClick={() => setIsDemoMode(!isDemoMode)}
          className="bg-slate-800 text-white px-6 py-3 rounded-full shadow-lg font-bold hover:bg-slate-700 transition transform hover:scale-105"
        >
          {isDemoMode ? "Feature Implemented" : "Back to Demo"}
        </button>
      </div>

      {!isDemoMode && (
      <nav className="fixed bottom-0 md:sticky md:top-0 left-0 w-full md:w-64 h-auto md:h-screen bg-white/60 md:bg-white/40 backdrop-blur-md border-t md:border-t-0 md:border-r border-slate-200 z-50 flex flex-row md:flex-col md:pt-12 p-3 md:p-6 gap-3 overflow-x-auto md:overflow-y-auto shadow-xl items-center md:items-stretch hide-scrollbar">
        <h3 className="hidden md:block text-slate-500 font-bold mb-4 uppercase tracking-wider text-sm px-2">Notebook Sets</h3>
        
        {tabs.map(tab => (
          <div 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 group cursor-pointer flex items-center justify-between px-4 py-2 md:py-3 rounded text-left font-medium transition-all shadow-sm ${tab.color} ${activeTab === tab.id ? 'scale-105 shadow-md -rotate-1 font-bold border border-slate-800/10' : 'hover:scale-105 border border-transparent rotate-1 text-slate-700 opacity-80'}`}
          >
             <span className="truncate text-slate-800">{tab.name}</span>
             {tabs.length > 1 && (
               <button 
                 onClick={(e) => handleDeleteTab(tab.id, e)}
                 className="text-slate-500 hover:text-red-500 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-1 ml-2 hidden md:block" 
                 title="Delete Tab"
               >
                 x
               </button>
             )}
          </div>
        ))}

        {!isAddingTab ? (
           <button 
             onClick={() => setIsAddingTab(true)} 
             className="flex-shrink-0 px-4 py-2 md:py-3 rounded font-medium text-slate-500 hover:bg-slate-100 border-2 border-dashed border-slate-300 flex justify-center items-center gap-2 transition"
             title="Add new set"
           >
             <span className="text-xl leading-none">+</span> <span className="hidden md:inline">New Set</span>
           </button>
        ) : (
          <form onSubmit={handleAddTab} className="flex-shrink-0 flex flex-col gap-2 p-3 bg-white shadow-md rounded border border-slate-200">
             <input
               value={newTabName}
               onChange={e => setNewTabName(e.target.value)}
               className="w-full md:w-auto px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-800 text-sm focus:outline-none focus:border-slate-400"
               placeholder="Tab name"
               autoFocus
             />
             <div className="flex gap-1 justify-end">
               <button type="submit" className="text-xs bg-slate-800 px-2 py-1 rounded text-white hover:bg-slate-700">Add</button>
               <button type="button" onClick={() => setIsAddingTab(false)} className="text-xs bg-slate-200 px-2 py-1 rounded text-slate-700 hover:bg-slate-300">Cancel</button>
             </div>
          </form>
        )}
      </nav>
      )}

      <div className="flex-1 flex flex-col items-center py-12 px-4 sm:px-8 overflow-y-auto">
        <div className="max-w-md w-full flex flex-col items-center text-center mt-4 bg-white/50 backdrop-blur border border-slate-200 p-8 rounded-xl shadow-sm relative">
          
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-slate-300 opacity-60 rotate-2"></div>

          <div className="relative w-32 h-32 mb-6 group">
            <label className={`relative w-full h-full ${isDemoMode ? '' : 'cursor-pointer'} overflow-hidden rounded-full border-4 border-white shadow-md block`} title={isDemoMode ? '' : "Upload new image"}>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="hidden"
                disabled={isDemoMode}
              />
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                className={`object-cover w-full h-full ${isDemoMode ? '' : 'group-hover:brightness-75'} transition-all duration-300`}
              />
              {!isDemoMode && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <span className="text-white text-sm bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full font-medium">
                    Upload
                  </span>
                </div>
              )}
            </label>
          </div>
          
          {/* Name Editable Field */}
          {isEditingName && !isDemoMode ? (
            <div className="flex items-center gap-2 mb-2">
              <input 
                type="text" 
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="px-3 py-1 rounded border-b-2 border-slate-400 bg-transparent text-slate-800 focus:outline-none focus:border-slate-800 text-center text-xl font-bold"
                autoFocus
              />
              <button 
                onClick={handleSaveName}
                className="px-3 py-1 bg-slate-800 text-white rounded font-medium hover:bg-slate-700 transition shadow"
              >
                Save
              </button>
            </div>
          ) : (
            <div 
              className={`flex items-center justify-center gap-2 mb-2 ${isDemoMode ? '' : 'group cursor-pointer'}`} 
              onClick={() => {
                if(isDemoMode) return;
                setTempName(profile.name);
                setIsEditingName(true);
              }}
              title={isDemoMode ? '' : "Click to edit name"}
            >
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight hover:text-slate-600 transition-colors" style={{fontFamily: "'Comic Sans MS', 'Chalkboard SE', sans-serif"}}>
                {profile.name}
              </h1>
              {!isDemoMode && (
                <span className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                  ✎
                </span>
              )}
            </div>
          )}

          {isEditingRole && !isDemoMode ? (
            <div className="flex items-center gap-2 mb-4 w-full">
              <input 
                type="text" 
                value={tempRole}
                onChange={(e) => setTempRole(e.target.value)}
                className="w-full px-3 py-1 bg-transparent border-b border-slate-300 text-slate-600 focus:outline-none focus:border-slate-500 text-center text-lg"
                autoFocus
              />
              <button 
                onClick={handleSaveRole}
                className="px-3 py-1 bg-slate-800 text-white rounded font-medium hover:bg-slate-700 shadow"
              >
                Save
              </button>
            </div>
          ) : (
            <div 
              className={`flex items-center justify-center gap-2 mb-4 ${isDemoMode ? '' : 'group cursor-pointer'} w-full`} 
              onClick={() => {
                if(isDemoMode) return;
                setTempRole(profile.role);
                setIsEditingRole(true);
              }}
              title={isDemoMode ? '' : "Click to edit role"}
            >
              <h2 className="text-slate-600 font-medium text-lg hover:text-slate-800 transition-colors">
                {profile.role}
              </h2>
              {!isDemoMode && (
                <span className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                  ✎
                </span>
              )}
            </div>
          )}

          {isEditingBio && !isDemoMode ? (
            <div className="flex items-center gap-2 mb-6 w-full">
              <textarea 
                value={tempBio}
                onChange={(e) => setTempBio(e.target.value)}
                className="w-full px-3 py-2 rounded bg-yellow-50 border border-yellow-200 text-slate-700 focus:outline-none focus:border-yellow-400 text-center font-light leading-relaxed min-h-[80px]"
                autoFocus
              />
              <button 
                onClick={handleSaveBio}
                className="px-3 py-2 h-full bg-slate-800 text-white rounded font-medium hover:bg-slate-700 shadow self-stretch"
              >
                Save
              </button>
            </div>
          ) : (
            <div 
              className={`flex flex-col items-center justify-center gap-2 mb-6 ${isDemoMode ? '' : 'group cursor-pointer'} w-full`} 
              onClick={() => {
                if(isDemoMode) return;
                setTempBio(profile.bio);
                setIsEditingBio(true);
              }}
              title={isDemoMode ? '' : "Click to edit bio"}
            >
              <p className="text-slate-600 max-w-sm leading-relaxed font-normal hover:text-slate-800 transition-colors relative px-4 bg-yellow-100/50 p-3 rounded rotate-1">
                {profile.bio}
                {!isDemoMode && (
                  <span className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs absolute right-1 top-1">
                    ✎
                  </span>
                )}
              </p>
            </div>
          )}
        </div>

        <div className="max-w-md w-full flex items-center justify-center border-b-2 border-dashed border-slate-300 mt-8 mb-6 pb-2 px-2">
          <h3 className="text-slate-600 font-bold text-xl uppercase tracking-widest flex items-center gap-2 px-4 py-1 bg-white rounded shadow-sm -rotate-2">
            📌 {isDemoMode ? 'All Links' : (tabs.find(t => t.id === activeTab)?.name || 'Links')}
          </h3>
        </div>

        {isDemoMode && (
          <p className="text-slate-500 italic text-center max-w-md w-full mb-4 px-4">
            whole bunch of links no idea what is what
          </p>
        )}

        <div className="max-w-md w-full flex flex-col gap-6 mb-8 pt-2">
          {displayLinks.length === 0 ? (
            <div className="text-slate-500 bg-white/50 py-10 rounded text-center border-2 border-dashed border-slate-300">
              <span className="hidden md:inline">Nothing here yet! Grab a post-it.</span>
              <span className="md:hidden">Nothing here yet!</span>
            </div>
          ) : (
            displayLinks.map((link, index) => {
              const rotations = ['-rotate-2', 'rotate-1', 'rotate-2', '-rotate-1', 'rotate-0'];
              const rotateClass = rotations[Math.abs(index) % rotations.length];
              const linkColor = getTabColor(link.tabId);
              
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative w-full flex items-center justify-between p-4 ${linkColor} hover:brightness-95 border border-slate-800/5 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg overflow-hidden ${rotateClass}`}
                  style={{boxShadow: '2px 4px 10px rgba(0,0,0,0.1)'}}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/40 shadow-sm" style={{clipPath: 'polygon(5% 0, 95% 2%, 100% 100%, 0 98%)'}} title="tape"></div>
                  
                  <div className="flex items-center gap-4 relative z-10 w-full mt-2">
                    {link.imageUrl ? (
                      <img 
                        src={link.imageUrl} 
                        alt={link.title} 
                        className="w-12 h-12 rounded object-cover border-2 border-white shadow-sm filter sepia-[0.2]" 
                      />
                    ) : (
                      <div className="w-12 h-12 rounded bg-white/50 flex items-center justify-center border border-slate-800/10 shadow-sm">
                        <span className="text-xl">�</span>
                      </div>
                    )}
                    
                    <span className="text-slate-800 font-bold text-lg w-full text-left" style={{fontFamily: "'Comic Sans MS', 'Chalkboard SE', sans-serif"}}>{link.title}</span>
                    <span className="text-slate-600 opacity-40 group-hover:opacity-100 transition-opacity duration-300 transform font-bold text-xl pr-2">
                      →
                    </span>
                  </div>
                </a>
              );
            })
          )}
        </div>

        {!isDemoMode && (
        <div className="max-w-md w-full bg-white border border-slate-200 rounded p-4 shadow-sm relative rotate-1">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-slate-200 opacity-80 -rotate-2"></div>
          
          {!showAddForm ? (
            <button 
              onClick={() => setShowAddForm(true)}
              className="w-full py-4 border-2 border-dashed border-slate-300 text-slate-500 hover:text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-colors font-bold flex items-center justify-center gap-2 mt-2"
            >
              <span className="text-xl">+</span> Add note to {tabs.find(t=>t.id===activeTab)?.name}
            </button>
          ) : (
            <form onSubmit={handleAddLink} className="flex flex-col gap-3 mt-4">
              <h3 className="text-slate-700 font-bold text-left mb-1 border-b-2 border-dashed border-slate-200 pb-2">New Note for {tabs.find(t=>t.id===activeTab)?.name}</h3>
              
              <input 
                type="text" 
                placeholder="Title (e.g. My Website)" 
                value={newLink.title}
                onChange={(e) => setNewLink({...newLink, title: e.target.value})}
                className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-500"
                required
              />
              
              <input 
                type="url" 
                placeholder="URL (e.g. https://...)" 
                value={newLink.url}
                onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-500"
                required
              />
              
              <input 
                type="url" 
                placeholder="Image URL (optional)" 
                value={newLink.imageUrl}
                onChange={(e) => setNewLink({...newLink, imageUrl: e.target.value})}
                className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-500"
              />
              
              <div className="flex gap-2 mt-2">
                <button 
                  type="submit"
                  className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded font-bold transition-colors shadow"
                >
                  Stick it
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
        )}
        
        <div className="mt-auto pt-16 pb-4 text-slate-400 text-sm w-full text-center">
          <p>© {new Date().getFullYear()} {profile.name}. Designed with ♥️.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
