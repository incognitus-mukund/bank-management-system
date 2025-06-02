/*
 * bank.c
 * 
 * MOHAK MAJI
 * MUKUND KUMAR (PL)
 * MUSKAN KHATUN
 * NAWEED RAZA KHAN
 */

#include <stdio.h>

int main() {
    float fBalance = 0.0;
    int cChoice;
    float fAmount;
    
    printf("╔══════════════════════════════════════╗\n");
    printf("║        Bank Management System        ║\n");
    printf("╚══════════════════════════════════════╝\n");
    
    while(1) {
        printf("\n┌─────────── MAIN MENU ───────────┐\n");
        printf("│ 1. 💰 Deposit Money             │\n");
        printf("│ 2. 💸 Withdraw Money            │\n");
        printf("│ 3. 💳 Check Balance             │\n");
        printf("│ 4. 🚪 Exit System               │\n");
        printf("└─────────────────────────────────┘\n");
        printf("Enter your choice (1-4): ");
        scanf("%d", &cChoice);
        
        switch(cChoice) {
            case 1:
                printf("\n--- DEPOSIT TRANSACTION ---\n");
                printf("Current Balance: ₹%.2f\n", fBalance);
                printf("Enter amount to deposit: ₹");
                scanf("%f", &fAmount);
                
                if(fAmount > 0) {
                    fBalance += fAmount;
                    printf("✅ Successfully deposited ₹%.2f\n", fAmount);
                    printf("New Balance: ₹%.2f\n", fBalance);
                } else {
                    printf("❌ Invalid amount! Please enter positive value.\n");
                }
                break;
                
            case 2:
                printf("\n--- WITHDRAWAL TRANSACTION ---\n");
                printf("Current Balance: ₹%.2f\n", fBalance);
                printf("Enter amount to withdraw: ₹");
                scanf("%f", &fAmount);
                
                if(fAmount > 0 && fAmount <= fBalance) {
                    fBalance -= fAmount;
                    printf("✅ Successfully withdrawn ₹%.2f\n", fAmount);
                    printf("Remaining Balance: ₹%.2f\n", fBalance);
                    
                    if(fBalance < 100 && fBalance > 0) {
                        printf("⚠️  Warning: Your balance is getting low!\n");
                    }
                } else if(fAmount > fBalance) {
                    printf("❌ Insufficient balance!\n");
                    printf("Available Balance: ₹%.2f\n", fBalance);
                } else {
                    printf("❌ Invalid amount! Please enter positive value.\n");
                }
                break;
                
            case 3:
                printf("\n--- ACCOUNT BALANCE ---\n");
                printf("Current Balance: ₹%.2f\n", fBalance);
                
                if(fBalance == 0) {
                    printf("Status: Account is empty\n");
                } else if(fBalance < 100) {
                    printf("Status: Low balance\n");
                } else if(fBalance < 1000) {
                    printf("Status: Moderate balance\n");
                } else {
                    printf("Status: Good balance\n");
                }
                break;
                
            case 4:
                printf("\n══════════════════════════════════════════\n");
                printf("Thank you for using our Bank Management System!\n");
                printf("Have a great day!\n");
                printf("══════════════════════════════════════════\n");
                return 0;
                
            default:
                printf("\n❌ Invalid choice! Please select from options 1-4.\n");
        }
        
        printf("\nPress Enter to continue...");
        getchar();
        getchar();
    }
    
    return 0;
}
