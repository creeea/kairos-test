import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Keypair } from '@solana/web3.js';
import { Wallet } from 'ethers';

export default function WalletScreen({ navigation }) {
  const [wallets, setWallets] = useState({
    solana: '',
    evm: '',
    tao: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateWallets();
  }, []);

  const generateWallets = async () => {
    // Generate Solana wallet
    const solanaWallet = Keypair.generate();
    
    // Generate EVM wallet
    const evmWallet = Wallet.createRandom();
    
    // Generate TAO wallet (placeholder - replace with actual TAO wallet generation)
    const taoWallet = 'tao' + Math.random().toString(36).substring(2, 15);

    setWallets({
      solana: solanaWallet.publicKey.toString(),
      evm: evmWallet.address,
      tao: taoWallet,
    });
    setLoading(false);
  };

  const handleContinue = () => {
    navigation.navigate('Home');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Generating your wallets...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Crypto Wallets</Text>
      
      <View style={styles.walletContainer}>
        <Text style={styles.walletLabel}>Solana Wallet</Text>
        <Text style={styles.walletAddress}>{wallets.solana}</Text>
      </View>

      <View style={styles.walletContainer}>
        <Text style={styles.walletLabel}>EVM Wallet</Text>
        <Text style={styles.walletAddress}>{wallets.evm}</Text>
      </View>

      <View style={styles.walletContainer}>
        <Text style={styles.walletLabel}>TAO Wallet</Text>
        <Text style={styles.walletAddress}>{wallets.tao}</Text>
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Continue to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 40,
    color: '#1a1a1a',
  },
  walletContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  walletLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#1a1a1a',
  },
  walletAddress: {
    fontSize: 14,
    color: '#666666',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
  },
});