import React from 'react';

export default function Citations() {
    return (
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4 ">Cosmic 255555 Sources 📖 :</h1>
            <ul className="space-y-4">
                <li className="bg-opacity-20 bg-white p-4 rounded">
                    <h2 className="text-xl font-semibold mb-2 text-blue-300">Neutron Star Background GIF:</h2>
                    <p>Shillingburg, Michael. "Michael Shillingburg." Tumblr. Accessed August 9, 2024.</p>
                    <a href="https://michaelshillingburg.tumblr.com/" className=" hover:text-yellow-100 transition-colors" target="_blank" rel="noopener noreferrer">https://michaelshillingburg.tumblr.com/</a>
                    <p className="mt-2">Giphy. "Pixel Space GIFs." Accessed August 9, 2024.</p>
                    <a href="https://giphy.com/explore/pixel-space" className=" hover:text-yellow-100 transition-colors" target="_blank" rel="noopener noreferrer">https://giphy.com/explore/pixel-space</a>
                </li>
                <li className="bg-opacity-20 bg-white p-4 rounded">
                    <h2 className="text-xl font-semibold mb-2 text-blue-300">Website Background Image:</h2>
                    <p>Freepik. "Animation Background Space Images." Accessed August 9, 2024.</p>
                    <a href="https://www.freepik.com/search?format=search&query=animation%20background%20space" className=" hover:text-yellow-100 transition-colors" target="_blank" rel="noopener noreferrer">https://www.freepik.com/search?format=search&query=animation%20background%20space</a>
                </li>
                <li className="bg-opacity-20 bg-white p-4 rounded">
                    <h2 className="text-xl font-semibold mb-2 text-blue-300">Background Music:</h2>
                    <p>A huge shoutout to 8-bit music channel for their copyright-free music access. Drop them a follow and support their cause:</p>
                    <a href="https://youtu.be/KvDcTXEfdVs?si=cvOlT3IPH-JCu32O" className=" hover:text-yellow-100 transition-colors" target="_blank" rel="noopener noreferrer">https://youtu.be/KvDcTXEfdVs?si=cvOlT3IPH-JCu32O</a>
                </li>
            </ul>
        </div>
    );
}