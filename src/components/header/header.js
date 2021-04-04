import React from 'react';

export default function Header(Page) {
    return props =>
        <div>
            <div className="headerShell">
                Bonfire Character Vault (beta)
            </div>
            <Page {...props} />
        </div>
}