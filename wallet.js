function generateMnemonic() {
    return ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16));
}

function generateWallet() {
    const wallet = ethers.Wallet.createRandom();
    return {
        publicKey: wallet.address,
        privateKey: wallet.privateKey
    };
}




document.getElementById("btn-eth-wallet").addEventListener("click", function() {
    const wallet = generateWallet();
    const mnemonic = generateMnemonic();
    document.getElementById("phrase").innerText = mnemonic;
    document.getElementById("public-key").innerText = wallet.publicKey;
    document.getElementById("private-key").innerText = wallet.privateKey;

    document.getElementById('eth-wallet').style.display = 'block';
    document.getElementById('sol-wallet').style.display = 'none';
});
document.getElementById('btn-sol-wallet').addEventListener('click', async () => {
    const newAccount = new solanaWeb3.Keypair(); // Create a new Solana wallet
    
    const publicKey = newAccount.publicKey.toString();
    const privateKey = newAccount.secretKey.toString();

    // Display the public and private keys in the HTML
    document.getElementById('sol-public-key').textContent = publicKey;
    document.getElementById('sol-private-key').textContent = privateKey;

    document.getElementById('sol-wallet').style.display = 'block';
    document.getElementById('eth-wallet').style.display = 'none';
});
    document.getElementById('phrase').addEventListener('click', () => {
        const mnemonicText = document.getElementById('phrase').innerText;
        navigator.clipboard.writeText(mnemonicText)
            .then(() => {
                alert('Mnemonic phrase copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    });


document.getElementById('public-key').addEventListener('click', () => {
    const publicKey = document.getElementById('public-key').innerText;
    navigator.clipboard.writeText(publicKey);
    alert('Public key copied to clipboard!');
});

document.getElementById('private-key').addEventListener('click', () => {
    const privateKey = document.getElementById('private-key').innerText;
    navigator.clipboard.writeText(privateKey);
    alert('Private key copied to clipboard!');
});
document.getElementById('btn-qr').addEventListener('click', () => {
    const publicKey = document.getElementById('public-key').innerText;
    if (publicKey) {
        new QRCode(document.getElementById('qrcode'), publicKey);
    } else {
        alert('Please generate a wallet first.');
    }
});


