import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

type ViewType = 'main' | 'deposit' | 'withdraw' | 'balance' | 'exit';

interface Transaction {
  type: 'deposit' | 'withdraw';
  amount: number;
  timestamp: string;
  balance: number;
}

interface StatusMessage {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  id: string;
}

export default function BankSystem() {
  const [balance, setBalance] = useState<number>(() => {
    const saved = sessionStorage.getItem('bankBalance');
    return saved ? parseFloat(saved) : 0.0;
  });
  
  const [currentView, setCurrentView] = useState<ViewType>('main');
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = sessionStorage.getItem('bankTransactions');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const [choiceInput, setChoiceInput] = useState<string>('');
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  
  const depositInputRef = useRef<HTMLInputElement>(null);
  const withdrawInputRef = useRef<HTMLInputElement>(null);
  const choiceInputRef = useRef<HTMLInputElement>(null);

  // Save balance to session storage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('bankBalance', balance.toString());
  }, [balance]);

  // Save transactions to session storage whenever they change
  useEffect(() => {
    sessionStorage.setItem('bankTransactions', JSON.stringify(transactions));
  }, [transactions]);

  // Auto-focus inputs when views change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentView === 'deposit' && depositInputRef.current) {
        depositInputRef.current.focus();
      } else if (currentView === 'withdraw' && withdrawInputRef.current) {
        withdrawInputRef.current.focus();
      } else if (currentView === 'main' && choiceInputRef.current) {
        choiceInputRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [currentView]);

  const showStatusMessage = (message: string, type: StatusMessage['type']) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newMessage: StatusMessage = { message, type, id };
    
    setStatusMessages(prev => [...prev, newMessage]);
    
    // Auto-clear after 5 seconds
    setTimeout(() => {
      setStatusMessages(prev => prev.filter(msg => msg.id !== id));
    }, 5000);
  };

  const clearStatusMessages = () => {
    setStatusMessages([]);
  };

  const getBalanceStatus = () => {
    if (balance === 0) {
      return "Status: Account is empty";
    } else if (balance < 100) {
      return "Status: Low balance";
    } else if (balance < 1000) {
      return "Status: Moderate balance";
    } else {
      return "Status: Good balance";
    }
  };

  const addTransaction = (type: 'deposit' | 'withdraw', amount: number) => {
    const newTransaction: Transaction = {
      type,
      amount,
      timestamp: new Date().toLocaleString(),
      balance
    };
    
    setTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
  };

  const handleMenuChoice = () => {
    const choice = parseInt(choiceInput);
    
    if (!choice || choice < 1 || choice > 4) {
      showStatusMessage('❌ Invalid choice! Please select from options 1-4.', 'error');
      return;
    }
    
    clearStatusMessages();
    
    switch (choice) {
      case 1:
        setCurrentView('deposit');
        break;
      case 2:
        setCurrentView('withdraw');
        break;
      case 3:
        setCurrentView('balance');
        break;
      case 4:
        setCurrentView('exit');
        break;
    }
    
    setChoiceInput('');
  };

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    
    if (!amount || amount <= 0) {
      showStatusMessage('❌ Invalid amount! Please enter positive value.', 'error');
      return;
    }
    
    setBalance(prev => prev + amount);
    addTransaction('deposit', amount);
    
    showStatusMessage(
      `✅ Successfully deposited ₹${amount.toFixed(2)}\nNew Balance: ₹${(balance + amount).toFixed(2)}`, 
      'success'
    );
    
    setDepositAmount('');
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    
    if (!amount || amount <= 0) {
      showStatusMessage('❌ Invalid amount! Please enter positive value.', 'error');
      return;
    }
    
    if (amount > balance) {
      showStatusMessage(
        `❌ Insufficient balance!\nAvailable Balance: ₹${balance.toFixed(2)}`, 
        'error'
      );
      return;
    }
    
    const newBalance = balance - amount;
    setBalance(newBalance);
    addTransaction('withdraw', amount);
    
    let message = `✅ Successfully withdrawn ₹${amount.toFixed(2)}\nRemaining Balance: ₹${newBalance.toFixed(2)}`;
    
    if (newBalance < 100 && newBalance > 0) {
      message += '\n⚠️ Warning: Your balance is getting low!';
      showStatusMessage(message, 'warning');
    } else {
      showStatusMessage(message, 'success');
    }
    
    setWithdrawAmount('');
  };

  const returnToMenu = () => {
    setCurrentView('main');
    clearStatusMessages();
  };

  const resetSystem = () => {
    setBalance(0);
    setTransactions([]);
    sessionStorage.removeItem('bankBalance');
    sessionStorage.removeItem('bankTransactions');
    setCurrentView('main');
    showStatusMessage('🔄 New session started!', 'success');
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  const selectMenuOption = (option: number) => {
    setChoiceInput(option.toString());
    setTimeout(() => handleMenuChoice(), 100);
  };

  const getMessageClasses = (type: StatusMessage['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-900/50 border-green-500 text-green-200';
      case 'error':
        return 'bg-red-900/50 border-red-500 text-red-200';
      case 'warning':
        return 'bg-orange-900/50 border-orange-500 text-orange-200';
      default:
        return 'bg-blue-900/50 border-blue-500 text-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Terminal Window Header */}
        <div className="terminal-window rounded-t-lg p-4 border-b border-slate-600">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-4 terminal-text opacity-70">Bank Management System - Terminal</span>
          </div>
        </div>
        
        {/* Main Terminal Content */}
        <Card className="terminal-window rounded-t-none rounded-b-lg border-0 min-h-96">
          <div className="p-6">
            {/* Header */}
            <div className="ascii-art terminal-glow text-center mb-6 terminal-text">
              ╔══════════════════════════════════════╗{'\n'}
              ║        Bank Management System        ║{'\n'}
              ╚══════════════════════════════════════╝
            </div>
            
            {/* Main Menu */}
            {currentView === 'main' && (
              <div className="fade-in">
                <div className="ascii-art mb-4 terminal-text">
                  ┌─────────── MAIN MENU ───────────┐{'\n'}
                  │ 1. 💰 Deposit Money             │{'\n'}
                  │ 2. 💸 Withdraw Money            │{'\n'}
                  │ 3. 💳 Check Balance             │{'\n'}
                  │ 4. 🚪 Exit System               │{'\n'}
                  └─────────────────────────────────┘
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <Label className="terminal-text">Enter your choice (1-4):</Label>
                  <div className="flex gap-2 flex-wrap">
                    <Input
                      ref={choiceInputRef}
                      type="number"
                      min="1"
                      max="4"
                      value={choiceInput}
                      onChange={(e) => setChoiceInput(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, handleMenuChoice)}
                      className="terminal-input w-20"
                      placeholder="1-4"
                    />
                    <Button
                      onClick={handleMenuChoice}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Enter
                    </Button>
                  </div>
                </div>
                
                <div className="flex gap-2 flex-wrap mt-4">
                  {[1, 2, 3, 4].map((option) => (
                    <Button
                      key={option}
                      onClick={() => selectMenuOption(option)}
                      variant="outline"
                      className="menu-item bg-blue-600/20 border-blue-600 text-blue-200 hover:bg-blue-600/30"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Deposit Screen */}
            {currentView === 'deposit' && (
              <div className="fade-in">
                <div className="ascii-art mb-4 terminal-text text-lg">--- DEPOSIT TRANSACTION ---</div>
                <div className="mb-4 terminal-text">
                  Current Balance: ₹<span className="text-green-400 font-bold">{balance.toFixed(2)}</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="terminal-text">Enter amount to deposit: ₹</Label>
                    <Input
                      ref={depositInputRef}
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, handleDeposit)}
                      className="terminal-input mt-2"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button
                      onClick={handleDeposit}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      💰 Deposit
                    </Button>
                    <Button
                      onClick={returnToMenu}
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      ← Back to Main Menu
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Withdraw Screen */}
            {currentView === 'withdraw' && (
              <div className="fade-in">
                <div className="ascii-art mb-4 terminal-text text-lg">--- WITHDRAWAL TRANSACTION ---</div>
                <div className="mb-4 terminal-text">
                  Current Balance: ₹<span className="text-green-400 font-bold">{balance.toFixed(2)}</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="terminal-text">Enter amount to withdraw: ₹</Label>
                    <Input
                      ref={withdrawInputRef}
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, handleWithdraw)}
                      className="terminal-input mt-2"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button
                      onClick={handleWithdraw}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      💸 Withdraw
                    </Button>
                    <Button
                      onClick={returnToMenu}
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      ← Back to Main Menu
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Balance Screen */}
            {currentView === 'balance' && (
              <div className="fade-in">
                <div className="ascii-art mb-4 terminal-text text-lg">--- ACCOUNT BALANCE ---</div>
                <div className="mb-4 terminal-text">
                  Current Balance: ₹<span className="text-green-400 font-bold text-2xl">{balance.toFixed(2)}</span>
                </div>
                <div className="mb-6 terminal-text">
                  {getBalanceStatus()}
                </div>
                <Button
                  onClick={returnToMenu}
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  ← Back to Main Menu
                </Button>
              </div>
            )}
            
            {/* Exit Screen */}
            {currentView === 'exit' && (
              <div className="fade-in text-center">
                <div className="ascii-art mb-4 terminal-text">
                  ══════════════════════════════════════════{'\n'}
                  Thank you for using our Bank Management System!{'\n'}
                  Have a great day!{'\n'}
                  ══════════════════════════════════════════
                </div>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={returnToMenu}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    🔄 Start New Session
                  </Button>
                  <Button
                    onClick={resetSystem}
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-600/20"
                  >
                    🗑️ Reset All Data
                  </Button>
                </div>
              </div>
            )}
            
            {/* Status Messages */}
            {statusMessages.length > 0 && (
              <div className="mt-6 space-y-2">
                {statusMessages.map((msg) => (
                  <Alert key={msg.id} className={`status-message border-l-4 ${getMessageClasses(msg.type)}`}>
                    <AlertDescription className="whitespace-pre-line">
                      {msg.message}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            )}
          </div>
        </Card>
        
        {/* Transaction History */}
        <Card className="terminal-window mt-6 border-0">
          <div className="p-4">
            <div className="terminal-text text-center mb-3 font-bold">📊 Transaction History</div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {transactions.length === 0 ? (
                <div className="text-sm text-slate-400 text-center">No transactions yet</div>
              ) : (
                transactions.map((transaction, index) => {
                  const icon = transaction.type === 'deposit' ? '💰' : '💸';
                  const colorClass = transaction.type === 'deposit' ? 'text-green-400' : 'text-red-400';
                  const sign = transaction.type === 'deposit' ? '+' : '-';
                  
                  return (
                    <div key={index} className="transaction-item flex justify-between items-center text-sm border-b border-slate-600 pb-1 terminal-text">
                      <span>{icon} {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</span>
                      <span className={colorClass}>{sign}₹{transaction.amount.toFixed(2)}</span>
                      <span className="text-slate-400 text-xs">{transaction.timestamp}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
