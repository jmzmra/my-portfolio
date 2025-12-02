import { useState, useEffect, useRef } from 'react';
import { X, ArrowRight } from 'lucide-react';
import "remixicon/fonts/remixicon.css";

// Assets
import profilePic from './assets/profile.jpg';
import sad from './assets/sad.jpg';
import nicole from './assets/nicole.jpg';
import thought from './assets/thought.jpg';
import eguitar from './assets/eguitar.jpg';
import ukelele from './assets/ukelele.jpg';
import rnb from './assets/rnb.jpg';
import drums from './assets/drums.jpg';
import niki from './assets/niki.jpg';
import kpop from './assets/kpop.jpg';
import sabrina from './assets/sabrina.jpg';
import mbf from './assets/mbf.jpg';
import pop from './assets/pop.jpg';
import daniel from './assets/daniel.jpg';
import yearning from './assets/yearning.jpg';
import fruitcake from './assets/fruitcake.jpg';
import buzz from './assets/buzz.jpg';
import ariana from './assets/ariana.jpg';
import twosoon from './assets/twosoon.jpg';
import keshi from './assets/keshi.jpg';
import bandaids from './assets/bandaids.jpg';
import keshiplaylist from './assets/keshiplaylist.jpg';
import always from './assets/always.jpg';
import lauv from './assets/lauv.jpg';
import eighteen from './assets/eighteen.jpg';
import eternalsunshine from './assets/eternalsunshine.jpg';
import freudian from './assets/freudian.jpg';
import reminiscence from './assets/reminiscence.jpg';
import taylor from './assets/taylor.jpg';
import ttpd from './assets/ttpd.jpg';
import taylorver from './assets/taylorver.jpg';

// --- Font & Dynamic Styles ---
const FontStyles = ({ theme }) => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=VT323&display=swap');
    @import url("https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css");
    .font-bebas { font-family: 'Bebas Neue', sans-serif; }
    .font-pixel { font-family: 'VT323', monospace; }
    body {
      background-color: ${theme.hexBg};
      transition: background-color 0.5s ease;
      overflow: hidden;
    }
    ::-webkit-scrollbar { display: none; width: 0; height: 0; }
    * { scrollbar-width: none; -ms-overflow-style: none; }
    @keyframes pixel-fade {
      0% { opacity: 0; transform: scale(0.95); }
      100% { opacity: 1; transform: scale(1); }
    }
    .pixel-animate { animation: pixel-fade 0.2s ease-out forwards; }
    .social-icon { transition: color 0.3s ease, transform 0.2s ease; }
    .social-icon:hover { color: ${theme.buttonColor}; }
  `}</style>
);

// --- Mock Data ---
const CATEGORIES = ["ALBUMS", "PLAYLISTS", "INSTRUMENTS", "ARTISTS", "GENRES"];

const PROJECT_DATA = [
    {
        id: 1, title: "ELECTRIC GUITAR", year: "2024", category: "INSTRUMENTS", img: eguitar, audio: "/audio/eguitar.mp3",
        description: "I got my electric guitar in 2024. I’d wanted to learn guitar since I was a kid—I used to beg my parents for one whenever we passed by an instrument store. Now that I’m able to save my own money, I planned to finally buy a guitar. But the more I researched while saving up, the more I realized how cool electric guitars looked, so I decided to get one instead."
    },
    {
        id: 2, title: "SAD (NIKI VER.)", year: "2024", category: "PLAYLISTS", img: sad, audio: "/audio/sad.mp3", link: "https://open.spotify.com/playlist/2oyDmUwOINFRbSV5Zgr2sN?si=a970c0ee3f9f4cc2",
        description: "Made this playlist because I love NIKI and sad songs, so I figured why not put them together?"
    },
    {
        id: 3, title: "POP", year: "2023", category: "GENRES", img: pop, audio: "/audio/pop.mp3",
        description: "I started liking pop music more in 2023 because of NIKI, Ariana, and Sabrina. Ever since then, I’ve really come to appreciate the genre because it is catchy, fun, and always lifts my mood."
    },
    {
        id: 4, title: "UKELELE", year: "2024", category: "INSTRUMENTS", img: ukelele, audio: "/audio/ukelele.mp3",
        description: "I don’t actually own a ukulele. I borrow one from my friend. I wanted to learn it since I’ve also been learning guitar."
    },
    {
        id: 5, title: "R&B", year: "2021", category: "GENRES", img: rnb, audio: "/audio/rnb.mp3",
        description: "My all time favorite genre. I love the smooth, soulful vibes of R&B, perfect for when I’m in a melancholic mood. Most of my favorite artists make R&B music too."
    },
    {
        id: 6, title: "NIKI ZEFANYA", year: "2022", category: "ARTISTS", img: niki, audio: "/audio/niki.mp3", link: "https://open.spotify.com/artist/2kxP07DLgs4xlWz8YHlvfh?si=N9ari-yUQG2TvqcyvX22-Q",
        description: "I’ve known NIKI since 2021 thanks to her song ‘Every Summertime.’ She also became known for ‘Backburner,’ but I didn’t really listen to it until 2023, when I started exploring her music more. She’s been my favorite ever since."
    },
    {
        id: 7, title: "THOUGHT DAUGHTER", year: "2024", category: "PLAYLISTS", img: thought, audio: "/audio/thought.mp3", link: "https://open.spotify.com/playlist/6c2gypT73ZizZCPNtEGUg7?si=ca1d1d82f5aa42dc",
        description: "I made this playlist to go along with certain thoughts I’ve been having. It’s a collection of songs that reflect my more introspective side."
    },
    {
        id: 8, title: "DRUMS", year: "2025", category: "INSTRUMENTS", img: drums, audio: "/audio/drums.mp3",
        description: "I don’t actually play the drums, but I love the feeling of playing them. Ever since I first tried hitting a drum kit, I’ve wanted to own a set and learn properly."
    },
    {
        id: 9, title: "NICOLE", year: "2022", category: "ALBUMS", img: nicole, audio: "/audio/nicole.mp3", link: "https://open.spotify.com/album/0TMmGHybMKtsjBBEmwXHkF?si=I8fYvlPDSC6LNqbJDaOFbw",
        description: "My all-time favorite album. It’s full of my favorite sad songs, and I love NIKI’s lyricism. It hits hard with a deeply emotional and melancholic meaning."
    },
    {
        id: 10, title: "SABRINA CARPENTER", year: "2023", category: "ARTISTS", img: sabrina, audio: "/audio/sabrina.mp3", link: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B?si=uahkZ2rMQaWaTrt36wZ6yA",
        description: "I’ve known Sabrina Carpenter since I was a kid when she was on Disney. I only started listening to her music more in 2023, and I’ve loved her pop sound ever since."
    },
    {
        id: 11, title: "MAN'S BEST FRIEND", year: "2025", category: "ALBUMS", img: mbf, audio: "/audio/mbf.mp3", link: "https://open.spotify.com/album/1aqg30bNvLSWgShZgX4oop?si=m80bI-CuSDi8WJ8ScrmqWA",
        description: "I love this album by Sabrina. Her witty side comes through in the lyrics of every song. It’s a fun pop album I can’t stop listening to, and some of the lyrics make me laugh."
    },
    {
        id: 12, title: "DANIEL CAESAR", year: "2023", category: "ARTISTS", img: daniel, audio: "/audio/daniel.mp3", link: "https://open.spotify.com/artist/20wkVLutqVOYrc0kxFs7rA?si=-iBn2qafQbyXuTydsh9ebQ",
        description: "I got into Daniel Caesar because of my love for R&B and his song ‘Best Part,’ which blew up in 2023. His lyrics really resonate with me, and I love his melodies."
    },
    {
        id: 13, title: "K-POP", year: "2018", category: "GENRES", img: kpop, audio: "/audio/kpop.mp3",
        description: "Funny story, I used to jokingly say I hated K-Pop when I was younger. But by 8th grade, I had actually become a huge fan. I don’t listen to it as much now, but I still love the music, the culture, and the artists."
    },
    {
        id: 14, title: "YEARNING: OPM EDITION", year: "2025", category: "PLAYLISTS", img: yearning, audio: "/audio/yearning.mp3", link: "https://open.spotify.com/playlist/1M696tza88u9tLjEoGo87u?si=75a3c0fd4b2746fc",
        description: "I made this playlist just for fun and to bring back old Filipino music I used to listen to. Listening to these songs now takes me back and reminds me of good memories."
    },
    {
        id: 15, title: "FRUITCAKE", year: "2023", category: "ALBUMS", img: fruitcake, audio: "/audio/fruitcake.mp3", link: "https://open.spotify.com/album/7EisdwWcodpmHxgpGVE5Pg?si=gw-OD54eTe-uTqEhMNH1PQ",
        description: "Ever since it was released in 2023, I’ve been listening to this album whenever Christmas approaches. It brings the Christmas spirit even before the season, making me feel warm and hopeful."
    },
    {
        id: 16, title: "BUZZ", year: "2024", category: "ALBUMS", img: buzz, audio: "/audio/buzz.mp3", link: "https://open.spotify.com/album/3g73KFee4dbxDq5vTmX92S?si=gM8MqQx3RWCe2R7E9H9GFw",
        description: "This is my second favorite album by NIKI. It helped me get through a tough time in 2024, and I love how it blends different genres while still feeling cohesive."
    },
    {
        id: 17, title: "ARIANA GRANDE", year: "2023", category: "ARTISTS", img: ariana, audio: "/audio/ariana.mp3", link: "https://open.spotify.com/artist/66CXWjxzNUsdJxJ2JdwvnR?si=M3vp1z2sTcGB2M0gNpUlHg",
        description: "I’ve known Ariana since her Nickelodeon days, starring in ‘Victorious’ and ‘Sam & Cat.’ I’ve been listening to her songs since fifth grade, but recently I’ve started appreciating her discography even more and have been enjoying her latest releases."
    },
    {
        id: 18, title: "2 SOON", year: "2018", category: "ALBUMS", img: twosoon, audio: "/audio/twosoon.mp3", link: "https://open.spotify.com/album/5TfGMgtbj2pU60Hk7DT5Yb?si=bss4lM_FSlyaSsU-xKRadg",
        description: "One of my favorite singles. I’ve been listening to Keshi since around 2019. His music is so calming and perfect for when I’m in a melancholic mood."
    },
    {
        id: 19, title: "KESHI", year: "2020", category: "ARTISTS", img: keshi, audio: "/audio/keshi.mp3", link: "https://open.spotify.com/artist/3pc0bOVB5whxmD50W79wwO?si=De3506OJT3S4tv4uf2VXeg",
        description: "Interesting story about Keshi: I first heard him while watching ITZY in Paris, ITZY’s reality show, when ‘Right Here’ was playing in the background. I got curious, spent hours figuring out the song and artist, and I’ve been a fan ever since."
    },
    {
        id: 20, title: "BANDAIDS", year: "2020", category: "ALBUMS", img: bandaids, audio: "/audio/bandaids.mp3", link: "https://open.spotify.com/album/4LfFHT00C9ImLMUjHkqWjQ?si=AAZLWU4OTKCG4kMj4e6bIQ",
        description: "This album features ‘Less of You’ and ‘Right Here,’ which are my favorite Keshi songs. I actually discovered ‘Right Here’ while watching ITZY in Paris, and I ended up playing it nonstop for days."
    },
    {
        id: 21, title: "A KESHI PLAYLIST", year: "2023", category: "PLAYLISTS", img: keshiplaylist, audio: "/audio/keshiplaylist.mp3", link: "https://open.spotify.com/playlist/3nFbKO8gprHwLtDjJbGiez?si=2663a6dcff4e47fa",
        description: "I saved this random Spotify playlist for whenever I want to listen to Keshi. It’s a great mix of his popular tracks and some hidden gems."
    },
    {
        id: 22, title: "ALWAYS", year: "2020", category: "ALBUMS", img: always, audio: "/audio/always.mp3", link: "https://open.spotify.com/album/37FLvUnF5qC1LZBNCWqG1A?si=uLBo6dV-S4ej7wTs991yig",
        description: "One of my favorite Keshi albums, along with Bandaids. It has a chill vibe that I love, perfect for late-night listening."
    },
    {
        id: 23, title: "LAUV", year: "2021", category: "ARTISTS", img: lauv, audio: "/audio/lauv.mp3", link: "https://open.spotify.com/artist/5JZ7CnR6gTvEMKX4g70Amv?si=KmgU94NsTA-7Kvbz2v3HQg",
        description: "Lauv became one of my favorite artists ever since I first heard ‘I Like Me Better,’ either on a random day or on the radio. I got to know him through that song and ‘Paris in the Rain’ around 2021, and now I’m also starting to like one of his songs from Elemental, ‘Steal the Show.’"
    },
    {
        id: 24, title: "I MET YOU WHEN I WAS 18. (THE PLAYLIST)", year: "2018", category: "ALBUMS", img: eighteen, audio: "/audio/eighteen.mp3", link: "https://open.spotify.com/album/2iIqqSVeH04ytD0DIWrrA6?si=fCz0cxrdSWCnw-Olq-2pVA",
        description: "This album includes two of my all-time favorite songs: ‘Paris in the Rain’ and ‘I Like Me Better.’ They have a special place in my heart because they make me imagine being in New York and Paris. I like to romanticize the idea of traveling there someday whenever I listen to them."
    },
    {
        id: 25, title: "ETERNAL SUNSHINE DELUXE: BRIGHTER DAYS AHEAD", year: "2025", category: "ALBUMS", img: eternalsunshine, audio: "/audio/eternalsunshine.mp3", link: "https://open.spotify.com/album/6cbwstHlsAIIWurIIXXBPd?si=AAgf8RhES6CIoZV69LMdCQ",
        description: "This album is my favorite compared to its predecessor, eternal sunshine. It includes my favorite songs from 2024 and even some new favorites from 2025. It’s a mix of melancholic and upbeat tracks that I love listening to depending on my mood. Plus, this version includes the extended version of the intro, which makes it even better."
    },
    {
        id: 26, title: "FREUDIAN", year: "2017", category: "ALBUMS", img: freudian, audio: "/audio/freudian.mp3", link: "https://open.spotify.com/album/4E1XUBMTpLO7GpBzUo65Jp?si=Qe09Bd-lTd2bLc1M3uOElA",
        description: "This album includes most of my favorite Daniel Caesar songs, like ‘Get You’ and ‘Best Part.’ I just love its soulful and emotional vibe."
    },
    {
        id: 27, title: "REMINISCENCE", year: "2020", category: "PLAYLISTS", img: reminiscence, audio: "/audio/reminiscence.mp3", link: "https://open.spotify.com/playlist/7crQkKtJ72y5G9k5oJNybR?si=652d5b4016294fc4",
        description: "I made this playlist to recreate the feeling of visiting my grandparents’ old house in the province during vacations. My dad would always play his old tapes while driving, so I grew up listening to these songs. It’s my way of remembering him and reliving those moments."
    },
    {
        id: 28, title: "TAYLOR SWIFT", year: "2023", category: "ARTISTS", img: taylor, audio: "/audio/taylor.mp3", link: "https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02?si=3y4Qhcd7SWylT5nCndYOpw",
        description: "I’ve been a fan of Taylor Swift since I was a kid, when her songs were everywhere. I really started appreciating her music in 2023, with her re-releases and new tracks. Her lyrics, storytelling, and clever wordplay make her a true genius."
    },
    {
        id: 29, title: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY", year: "2024", category: "ALBUMS", img: ttpd, audio: "/audio/ttpd.mp3", link: "https://open.spotify.com/album/5H7ixXZfsNMGbIE5OBSpcb?si=_bATPe2kR--UIpsebRhhJw",
        description: "One of my favorite 2024 albums, mostly full of melancholic songs I loved that year. Her storytelling here is simply chef’s kiss."
    },
    {
        id: 30, title: "1989 (TAYLOR'S VERSION) [DELUXE]", year: "2023", category: "ALBUMS", img: taylorver, audio: "/audio/taylorver.mp3", link: "https://open.spotify.com/album/1o59UpKw81iHR0HPiSkJR0?si=_f3HrQuhSGSIZf-49XzrFQ",
        description: "This is one of my favorite re-released albums from Taylor Swift. I love how the new versions bring fresh life to her original songs while highlighting her incredible storytelling and lyrics."
    },
];

const THEMES = {
    spotify: {
        bg: 'bg-black', hexBg: '#000000', text: 'text-zinc-300', accent: 'text-[#1DB954]', border: 'border-[#1DB954]',
        hover: 'hover:bg-[#1DB954]/20', highlight: 'bg-[#1DB954] text-black', buttonColor: '#1DB954', glow: 'shadow-[0_0_20px_rgba(29,185,84,0.6)]'
    },
    crimson: {
        bg: 'bg-[#0a0a0a]', hexBg: '#0a0a0a', text: 'text-white', accent: 'text-zinc-400', border: 'border-[#DC2626]',
        hover: 'hover:bg-[#DC2626]/20', highlight: 'bg-[#DC2626] text-white', buttonColor: '#DC2626', glow: 'shadow-[0_0_20px_rgba(220,38,38,0.6)]'
    },
    midnight: {
        bg: 'bg-[#0e141b]', hexBg: '#0e141b', text: 'text-slate-300', accent: 'text-[#b8dbd9]', border: 'border-[#b8dbd9]',
        hover: 'hover:bg-[#b8dbd9]/10', highlight: 'bg-[#b8dbd9] text-[#0e141b]', buttonColor: '#b8dbd9', glow: 'shadow-[0_0_20px_rgba(184,219,217,0.4)]'
    },
    electric: {
        bg: 'bg-[#e4e5dc]', hexBg: '#e4e5dc', text: 'text-slate-800', accent: 'text-[#470ff4]', border: 'border-[#470ff4]',
        hover: 'hover:bg-[#470ff4]/10', highlight: 'bg-[#470ff4] text-white', buttonColor: '#470ff4', glow: 'shadow-[0_0_20px_rgba(71,15,244,0.4)]'
    },
};

// --- Components ---
const ProfileAvatar = ({ onClick, className }) => (
    <button onClick={onClick} className={`rounded-full border-2 border-current overflow-hidden hover:scale-105 transition-transform p-0 ${className}`}>
        <img src={profilePic} alt="Profile" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
    </button>
);

const SpotifyNowPlaying = ({ theme }) => {
    const [track, setTrack] = useState(null);
    const [loading, setLoading] = useState(true);
    const [time, setTime] = useState(0);

    const LAST_FM_USERNAME = "jmzmra";
    const LAST_FM_API_KEY = "e429923811d578edb293028eb2560db8";

    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LAST_FM_USERNAME}&api_key=${LAST_FM_API_KEY}&format=json&limit=1`);
                const data = await response.json();
                const recentTrack = data.recenttracks.track[0];
                if (recentTrack) {
                    setTrack({
                        name: recentTrack.name, artist: recentTrack.artist['#text'], album: recentTrack.album['#text'],
                        image: recentTrack.image[3]['#text'], url: recentTrack.url, isPlaying: recentTrack['@attr']?.nowplaying === 'true'
                    });
                }
            } catch (error) { console.error("Error fetching song:", error); } finally { setLoading(false); }
        };
        fetchNowPlaying();
        const dataInterval = setInterval(fetchNowPlaying, 5000);
        const timerInterval = setInterval(() => { setTime(prev => prev + 1); }, 1000);
        return () => { clearInterval(dataInterval); clearInterval(timerInterval); };
    }, []);

    useEffect(() => { setTime(0); }, [track?.name]);
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const equalizerStyles = `
        @keyframes bounce-1 { 0%, 100% { height: 20%; } 50% { height: 80%; } }
        @keyframes bounce-2 { 0%, 100% { height: 50%; } 50% { height: 30%; } }
        @keyframes bounce-3 { 0%, 100% { height: 30%; } 50% { height: 90%; } }
        @keyframes bounce-4 { 0%, 100% { height: 80%; } 50% { height: 40%; } }
        .eq-bar-1 { animation: bounce-1 0.8s infinite ease-in-out; }
        .eq-bar-2 { animation: bounce-2 1.0s infinite ease-in-out; }
        .eq-bar-3 { animation: bounce-3 0.7s infinite ease-in-out; }
        .eq-bar-4 { animation: bounce-4 0.9s infinite ease-in-out; }
        .paused-anim { animation-play-state: paused; height: 10% !important; }
    `;

    if (loading) return (
        <div className={`w-full h-32 border-2 border-dashed ${theme.border} rounded-xl flex items-center justify-center`}>
            <span className="font-pixel opacity-50 animate-pulse">Scanning...</span>
        </div>
    );
    if (!track) return null;

    return (
        <div className="mt-6 mb-6">
            <style>{equalizerStyles}</style>
            <h3 className="font-pixel text-3xl mb-4 flex justify-between items-end">
                <span>CURRENTLY:</span><span className="text-sm opacity-60 font-mono tracking-widest">{track.isPlaying ? formatTime(time) : "--:--"}</span>
            </h3>
            <a href={track.url} target="_blank" rel="noopener noreferrer" className={`group relative w-full overflow-hidden border-2 border-solid ${theme.border} rounded-sm p-0 block transition-transform hover:scale-[1.02] duration-300`}>
                <div className="absolute inset-0 bg-cover bg-center opacity-30 blur-md scale-110 transition-opacity group-hover:opacity-40" style={{ backgroundImage: `url(${track.image})` }}></div>
                <div className="relative z-10 p-5 flex flex-col gap-4 bg-black/40 backdrop-blur-sm h-full">
                    <div className="flex justify-between items-center border-b border-white/20 pb-2">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${track.isPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                            <span className="font-pixel text-xs tracking-[0.2em] uppercase text-white/80">{track.isPlaying ? "BROADCASTING" : "OFFLINE"}</span>
                        </div>
                        <div className="flex items-end gap-1 h-6">
                            {[1, 2, 3, 4].map(i => (<div key={i} className={`w-1.5 bg-white/80 eq-bar-${i} ${!track.isPlaying ? 'paused-anim' : ''}`}></div>))}
                        </div>
                    </div>
                    <div className="flex gap-6 items-center">
                        <img src={track.image} alt="art" className={`w-24 h-24 border border-white/20 shadow-lg ${track.isPlaying ? '' : 'grayscale'}`} />
                        <div className="flex flex-col overflow-hidden justify-center min-w-0 flex-1">
                            <span title={track.name} className="font-bebas text-3xl leading-none text-white truncate w-full pt-2 cursor-default">{track.name}</span>
                            <span title={track.artist} className={`font-pixel text-xl ${theme.accent} truncate w-full leading-none mt-1 cursor-default`}>{track.artist}</span>
                            <span title={track.album} className="font-pixel text-base opacity-60 uppercase mt-1 truncate cursor-default">{track.album}</span>
                        </div>
                    </div>
                </div>
                <div className={`absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all pointer-events-none`}></div>
            </a>
        </div>
    );
};

const SidebarContent = ({ theme, onClose, isModal = false }) => {
    const socialLinks = [
        { icon: 'ri-spotify-fill', url: 'https://open.spotify.com/user/s3wnpiwndpoez2z1w7anwfbvt?si=884ba614cd9f4377' },
        { icon: 'ri-linkedin-box-fill', url: 'https://www.linkedin.com/in/jumiah-zamora-478b4236a' },
        { icon: 'ri-github-fill', url: 'https://github.com/jmzmra' }
    ];
    return (
        <div className={`flex flex-col p-6 relative ${isModal ? 'bg-opacity-95 backdrop-blur-md h-full' : 'h-full'} ${theme.text}`}>
            {isModal && (<button onClick={onClose} className="absolute top-4 right-4 p-2 hover:opacity-75 z-50"><X size={32} /></button>)}
            <div className={`flex items-center gap-5 mt-6 mb-8 ${isModal ? 'mt-8' : ''}`}>
                <ProfileAvatar className="w-20 h-20 shrink-0" />
                <h1 className="font-bebas text-6xl leading-none pt-1 transition-colors duration-500" style={{ color: theme.buttonColor }}>HEY!</h1>
            </div>
            <div className={`font-pixel text-2xl space-y-6 leading-snug ${theme.accent}`}>
                <p>I'm currently a student at Pamantasan ng Lungsod ng Pasig, pursuing a degree in Information Technology and expanding my skills in both development and design.</p>
                <p>I’ve always enjoyed music, but web development became the path I followed and it’s something I’m continuing to grow in.</p>
                <p>Want to reach out?{' '}<a href="mailto:princessjumiah0@gmail.com" className="underline cursor-pointer hover:text-white transition-colors">Send me an email.</a></p>
            </div>
            <div className="flex gap-8 mt-5 justify-center">
                {socialLinks.map((social, i) => (
                    <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="social-icon hover:scale-110 block"><i className={`${social.icon} text-6xl`}></i></a>
                ))}
            </div>
            <div className="mt-9 mb-5 pb-6 md:pb-0"><SpotifyNowPlaying theme={theme} /></div>
        </div>
    );
};

const ProjectCard = ({ project, theme, isActive, onClick, onHover, onLeave }) => {
    const showViewButton = ["ALBUMS", "PLAYLISTS", "ARTISTS"].includes(project.category);
    return (
        <div onClick={() => onClick(project)} onMouseEnter={() => onHover && onHover(project)} onMouseLeave={() => onLeave && onLeave(project)} className="group cursor-pointer mb-8 break-inside-avoid">
            <div className={`relative overflow-hidden rounded-sm mb-3 transition-all duration-300 ease-out ${isActive ? 'border-4 border-solid scale-[1.02]' : 'border-0'}`} style={{ borderColor: isActive ? theme.buttonColor : undefined }}>
                <img src={project.img} alt={project.title} className={`w-full h-auto object-cover transition-all duration-500 ease-in-out transform ${isActive ? 'grayscale-0 scale-105' : 'grayscale group-hover:grayscale-0 group-hover:scale-105'}`} />
            </div>
            <div className="flex justify-between items-baseline border-b border-dashed pb-2 border-current opacity-70 group-hover:opacity-100 transition-opacity">
                <h3 className="font-bebas text-3xl tracking-wide transition-colors duration-300" style={{ color: isActive ? theme.buttonColor : undefined }}>{project.title}</h3>
            </div>
            <div className="flex justify-between font-pixel text-[20px] mt-1 uppercase tracking-wider opacity-60">
                <span>{project.year}</span><span>{project.category}</span>
            </div>
            {isActive && (
                <div className="mt-3 p-4 bg-white/5 rounded-sm pixel-animate border-l-2 border-dashed flex flex-col gap-4" style={{ borderColor: theme.buttonColor }}>
                    <p className="font-pixel text-xl leading-snug opacity-90">{project.description || "No description available."}</p>
                    {showViewButton && (
                        <div className="flex justify-end pt-2">
                            <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className={`group/btn relative inline-flex items-center gap-2 px-6 py-2 font-bebas text-xl tracking-wider uppercase border-2 border-current transition-all duration-150 ease-out bg-transparent hover:bg-white/5 shadow-[4px_4px_0px_0px_currentColor] hover:shadow-[2px_2px_0px_0px_currentColor] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1`} style={{ color: theme.buttonColor, borderColor: theme.buttonColor }}>
                                <span className="relative z-10">VIEW</span><ArrowRight size={18} className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default function Portfolio() {
    const [hasInteracted, setHasInteracted] = useState(false);
    const audioRef = useRef(null);
    const [activeProjectId, setActiveProjectId] = useState(null);
    const [activeTheme, setActiveTheme] = useState('spotify');
    const [filter, setFilter] = useState('ALL');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [numCols, setNumCols] = useState(1);
    const currentTheme = THEMES[activeTheme];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setNumCols(3);
            else if (window.innerWidth >= 768) setNumCols(2);
            else setNumCols(1);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        return () => { if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; } };
    }, []);

    const getProjectById = (id) => PROJECT_DATA.find(p => p.id === id);

    const playAudio = (audioUrl) => {
        if (!audioUrl) return;
        if (audioRef.current && audioRef.current.src.includes(audioUrl)) {
            if (audioRef.current.paused) audioRef.current.play().catch(e => console.log("Playback error", e));
            return;
        }
        if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
        const audio = new Audio(audioUrl);
        audio.loop = true;
        audio.volume = 0.5;
        audio.play().catch(() => console.log("Interaction required"));
        audioRef.current = audio;
    };

    const stopAudio = () => { if (audioRef.current) audioRef.current.pause(); };
    const handleHover = (project) => { playAudio(project.audio); };
    const handleMouseLeave = (project) => {
        if (activeProjectId === project.id) return;
        stopAudio();
        if (activeProjectId) { const activeProject = getProjectById(activeProjectId); if (activeProject) playAudio(activeProject.audio); }
    };
    const handleCardClick = (project) => {
        if (activeProjectId === project.id) { setActiveProjectId(null); stopAudio(); }
        else { setActiveProjectId(project.id); playAudio(project.audio); }
    };

    const filteredProjects = filter === 'ALL' ? PROJECT_DATA : PROJECT_DATA.filter(p => p.category === filter);
    const columns = Array.from({ length: numCols }, () => []);
    filteredProjects.forEach((project, i) => columns[i % numCols].push(project));

    return (
        <div className={`h-screen transition-colors duration-500 ${currentTheme.bg} ${currentTheme.text} overflow-hidden`}>
            <FontStyles theme={currentTheme} />
            <div className="flex flex-col md:flex-row h-full md:gap-0">
                <main className="flex-1 p-6 md:p-12 flex flex-col relative z-10 h-full overflow-y-auto">
                    <div className="flex justify-between items-start mb-12 md:mb-16">
                        <div className="flex gap-3">
                            {Object.keys(THEMES).map((t) => (
                                <button key={t} onClick={() => setActiveTheme(t)} className={`w-8 h-8 rounded-full shrink-0 aspect-square transition-all duration-300 ease-out ${activeTheme === t ? `${THEMES[t].glow} scale-105 opacity-100` : 'opacity-60 hover:opacity-100 hover:scale-105'}`} style={{ backgroundColor: THEMES[t].buttonColor }} />
                            ))}
                        </div>
                        <div className="md:hidden"><ProfileAvatar onClick={() => setSidebarOpen(true)} className={`w-12 h-12 ${currentTheme.text}`} /></div>
                    </div>
                    <div className="mb-12">
                        <div className="font-bebas text-6xl sm:text-8xl md:text-9xl leading-[0.85] tracking-tighter mix-blend-overlay opacity-90 wrap-break-word">
                            JUMIAH <span style={{ color: currentTheme.buttonColor }} className="transition-colors duration-500">ZAMORA</span>
                        </div>
                    </div>
                    <div className="mb-8">
                        <div className="font-pixel mb-4 text-3xl opacity-80">FILTER ME: <span className="opacity-50">{filteredProjects.length}</span></div>
                        <div className="flex flex-wrap gap-2 md:gap-4">
                            <button onClick={() => setFilter('ALL')} className={`font-bebas text-xl md:text-3xl px-4 md:px-6 py-2 rounded-md transition-all duration-200 ${filter === 'ALL' ? `${currentTheme.highlight} -translate-y-1 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]` : 'bg-white/5 hover:bg-white/10 text-current opacity-60 hover:opacity-100 hover:-translate-y-1'}`}>ALL</button>
                            {CATEGORIES.map(cat => (
                                <button key={cat} onClick={() => setFilter(cat)} className={`font-bebas text-xl md:text-3xl px-4 md:px-6 py-2 rounded-md transition-all duration-200 ${filter === cat ? `${currentTheme.highlight} -translate-y-1 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]` : 'bg-white/5 hover:bg-white/10 text-current opacity-60 hover:opacity-100 hover:-translate-y-1'}`}>{cat}</button>
                            ))}
                        </div>
                    </div>
                    <div className={`w-full border-b-2 border-dashed ${currentTheme.border} mb-8 opacity-50`}></div>
                    <div className="flex gap-8 items-start pb-20">
                        {columns.map((colProjects, colIndex) => (
                            <div key={colIndex} className="flex-1 flex flex-col w-full">
                                {colProjects.map((project) => (
                                    <ProjectCard key={project.id} project={project} theme={currentTheme} isActive={activeProjectId === project.id} onClick={handleCardClick} onHover={handleHover} onLeave={handleMouseLeave} />
                                ))}
                            </div>
                        ))}
                    </div>
                </main>
                <aside className={`hidden md:flex w-[480px] h-full`}>
                    <div className={`w-full h-full border-l-2 border-dashed ${currentTheme.border} bg-black/10 flex flex-col`}><SidebarContent theme={currentTheme} /></div>
                </aside>
                {sidebarOpen && (
                    <div className="fixed inset-0 z-50 flex justify-end md:hidden">
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
                        <div className={`relative w-full max-w-md h-full ${currentTheme.bg} border-l-4 border-dashed ${currentTheme.border} pixel-animate shadow-2xl overflow-y-auto`}>
                            <SidebarContent theme={currentTheme} onClose={() => setSidebarOpen(false)} isModal={true} />
                        </div>
                    </div>
                )}
            </div>
            {!hasInteracted && (
                <div onClick={() => setHasInteracted(true)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 cursor-pointer">
                    <div className="text-center animate-pulse">
                        <h1 className={`font-bebas text-6xl ${currentTheme.text} mb-2`}>CLICK TO START</h1>
                        <p className="font-pixel text-xl text-white/50">( enable sound )</p>
                    </div>
                </div>
            )}
        </div>
    );
}