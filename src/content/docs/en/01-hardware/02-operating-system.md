---
label: OS
order: 20
---

# Setting Up a Bitcoin Node on Debian

In this guide, we will walk through the process of setting up a Bitcoin node on the Debian operating system. By running a Bitcoin node, you contribute to the security and decentralization of the Bitcoin network.

## Prerequisites

Before getting started, ensure that you have the following prerequisites:

- A Debian-based operating system (e.g., Debian, Ubuntu)
- Basic command line knowledge

## Installation Steps

Follow these steps to set up your Bitcoin node:

1. Update System Packages:

   ```bash
   sudo apt update
   sudo apt upgrade -y
   ```

2. Install Dependencies:

```
sudo apt install build-essential autoconf automake libtool pkg-config libssl-dev libboost-all-dev libevent-dev libminiupnpc-dev -y
```

3. Download Bitcoin Core:

```
wget https://bitcoincore.org/bin/bitcoin-core-VERSION/bitcoin-VERSION.tar.gz
```

Replace VERSION with the desired version number (e.g., 0.21.1).

4. Verify PGP Signature (Optional):

```
wget https://bitcoincore.org/bin/bitcoin-core-VERSION/SHA256SUMS.asc
gpg --verify SHA256SUMS.asc
```

5. Extract the Archive:

```
tar -xvf bitcoin-VERSION.tar.gz
```

6. Build and Install Bitcoin Core:

```
cd bitcoin-VERSION
./autogen.sh
./configure
make
sudo make install
```

7. Create Configuration File:

```
mkdir ~/.bitcoin
echo "rpcuser=yourusername" >> ~/.bitcoin/bitcoin.conf
echo "rpcpassword=yourpassword" >> ~/.bitcoin/bitcoin.conf
```

Replace yourusername and yourpassword with your desired values.

8. Start the Bitcoin Node:

```
bitcoind -daemon
```

9. Verify Node Status:

```
bitcoin-cli getblockchaininfo
```

If the node is successfully synced, you should see information about the blockchain.

Congratulations! You have successfully set up a Bitcoin node on Debian.

## Conclusion
Running a Bitcoin node on Debian is a crucial step in supporting the Bitcoin network. By following this guide, you now have a fully functional Bitcoin node that contributes to the security and decentralization of the network.

Remember to keep your Bitcoin node updated and securely configured to ensure its optimal performance.

Happy nodding!
