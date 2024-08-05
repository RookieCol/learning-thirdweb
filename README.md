# Thirdweb Deployment Script

> <span style="color: red;">**This repo is made to have fun learning, be careful with the private key you use.**</span>

This script facilitates the deployment of ERC20, ERC721, and ERC1155 using the Thirdweb SDK.

### Features
- Interactive CLI: Guides users to choose the contract type and input necessary parameters.
- Deployment Options: Supports ERC20, ERC721, and ERC1155 contracts.


### Current Blockchains

- Rootstock Testnet(31)
    

## Configuration

> **If you are on Replit, just go to Secrets and update the values.**

Create a `.env` file with the following variables:

- `clientId`: Your Thirdweb client ID.
- `privateKey`: Your private key for transaction signing.
  
### Usage

- Select Contract Type: Choose between ERC20, ERC721, or ERC1155.
- Provide Details: Input token name, symbol, and description.
- Deploy: The script deploys the contract and displays its address.

### Example 

```
? Which type of contract would you like to deploy? (Use arrow keys)
  ERC20
  ERC721
  ERC1155

# Upon selecting a contract type, you will be prompted to enter specific details.
? Enter the name of the ERC20 token: MyToken
? Enter the symbol of the ERC20 token: MTK
? Enter a description for the ERC20 token: My custom ERC20 token.

# The script will then deploy the contract and display the contract address.
Deploying ERC20 contract...
✔ ERC20 token deployed at address: 0xYourContractAddress
```

## Future Developments
- **Test:** Working on the testing of the current code.
- **Improved UI/UX:** I'm working on enhancing the user interface for better accessibility and user experience.
- **Support for Additional Blockchains:** I plan to add support for more blockchain networks beyond the Rootstock Testnet.
- **Advanced Contract Features:** I'm implementing more sophisticated contract functionalities and configurations.
- **Security Enhancements:** I'm continuously improving security measures and best practices.

If you have any suggestions or ideas, I'd love to hear them!

## Contributing

I'm open to contributions from the community! Here's how you can help:

- **Bug Reports & Feature Requests:** Use the Issues tab on the GitHub repository to report bugs or request new features.
- **Pull Requests:** Feel free to fork the project, make changes, and submit a pull request (PR).

### Guidelines for PRs

1. **Fork the repository** and create your branch from `main`.
2. **Write clear and descriptive commit messages**.
3. **Include tests** where applicable.
4. **Update documentation** if you add new features or change existing ones.

Forward to your contributions and collaboration!
