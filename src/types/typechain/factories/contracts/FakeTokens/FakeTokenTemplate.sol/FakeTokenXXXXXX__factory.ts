/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  FakeTokenXXXXXX,
  FakeTokenXXXXXXInterface,
} from "../../../../contracts/FakeTokens/FakeTokenTemplate.sol/FakeTokenXXXXXX";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_initialSupply",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000be638038062000be683398101604081905262000034916200024c565b604080518082018252600f81526e08cc2d6caa8ded6cadcb0b0b0b0b0b608b1b60208083019182528351808501909452600984526808ca89cb0b0b0b0b0b60bb1b9084015281519192916200008c91600391620001a6565b508051620000a2906004906020840190620001a6565b505050620000b73382620000be60201b60201c565b50620002ca565b6001600160a01b038216620001195760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b80600260008282546200012d919062000266565b90915550506001600160a01b038216600090815260208190526040812080548392906200015c90849062000266565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b828054620001b4906200028d565b90600052602060002090601f016020900481019282620001d8576000855562000223565b82601f10620001f357805160ff191683800117855562000223565b8280016001018555821562000223579182015b828111156200022357825182559160200191906001019062000206565b506200023192915062000235565b5090565b5b8082111562000231576000815560010162000236565b6000602082840312156200025f57600080fd5b5051919050565b600082198211156200028857634e487b7160e01b600052601160045260246000fd5b500190565b600181811c90821680620002a257607f821691505b60208210811415620002c457634e487b7160e01b600052602260045260246000fd5b50919050565b61090c80620002da6000396000f3fe608060405234801561001057600080fd5b50600436106100c95760003560e01c80633950935111610081578063a457c2d71161005b578063a457c2d714610187578063a9059cbb1461019a578063dd62ed3e146101ad57600080fd5b8063395093511461014357806370a082311461015657806395d89b411461017f57600080fd5b806318160ddd116100b257806318160ddd1461010f57806323b872dd14610121578063313ce5671461013457600080fd5b806306fdde03146100ce578063095ea7b3146100ec575b600080fd5b6100d66101e6565b6040516100e39190610772565b60405180910390f35b6100ff6100fa3660046107e3565b610278565b60405190151581526020016100e3565b6002545b6040519081526020016100e3565b6100ff61012f36600461080d565b610290565b604051601281526020016100e3565b6100ff6101513660046107e3565b6102b4565b610113610164366004610849565b6001600160a01b031660009081526020819052604090205490565b6100d66102f3565b6100ff6101953660046107e3565b610302565b6100ff6101a83660046107e3565b6103b1565b6101136101bb36600461086b565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101f59061089e565b80601f01602080910402602001604051908101604052809291908181526020018280546102219061089e565b801561026e5780601f106102435761010080835404028352916020019161026e565b820191906000526020600020905b81548152906001019060200180831161025157829003601f168201915b5050505050905090565b6000336102868185856103bf565b5060019392505050565b60003361029e8582856104e3565b6102a9858585610575565b506001949350505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490919061028690829086906102ee9087906108d9565b6103bf565b6060600480546101f59061089e565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909190838110156103a45760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f00000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6102a982868684036103bf565b600033610286818585610575565b6001600160a01b0383166104215760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b606482015260840161039b565b6001600160a01b0382166104825760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b606482015260840161039b565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b03838116600090815260016020908152604080832093861683529290522054600019811461056f57818110156105625760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000604482015260640161039b565b61056f84848484036103bf565b50505050565b6001600160a01b0383166105f15760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f6472657373000000000000000000000000000000000000000000000000000000606482015260840161039b565b6001600160a01b0382166106535760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b606482015260840161039b565b6001600160a01b038316600090815260208190526040902054818110156106e25760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e63650000000000000000000000000000000000000000000000000000606482015260840161039b565b6001600160a01b038085166000908152602081905260408082208585039055918516815290812080548492906107199084906108d9565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161076591815260200190565b60405180910390a361056f565b600060208083528351808285015260005b8181101561079f57858101830151858201604001528201610783565b818111156107b1576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b03811681146107de57600080fd5b919050565b600080604083850312156107f657600080fd5b6107ff836107c7565b946020939093013593505050565b60008060006060848603121561082257600080fd5b61082b846107c7565b9250610839602085016107c7565b9150604084013590509250925092565b60006020828403121561085b57600080fd5b610864826107c7565b9392505050565b6000806040838503121561087e57600080fd5b610887836107c7565b9150610895602084016107c7565b90509250929050565b600181811c908216806108b257607f821691505b602082108114156108d357634e487b7160e01b600052602260045260246000fd5b50919050565b600082198211156108fa57634e487b7160e01b600052601160045260246000fd5b50019056fea164736f6c6343000809000a";

type FakeTokenXXXXXXConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FakeTokenXXXXXXConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FakeTokenXXXXXX__factory extends ContractFactory {
  constructor(...args: FakeTokenXXXXXXConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _initialSupply: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<FakeTokenXXXXXX> {
    return super.deploy(
      _initialSupply,
      overrides || {}
    ) as Promise<FakeTokenXXXXXX>;
  }
  override getDeployTransaction(
    _initialSupply: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_initialSupply, overrides || {});
  }
  override attach(address: string): FakeTokenXXXXXX {
    return super.attach(address) as FakeTokenXXXXXX;
  }
  override connect(signer: Signer): FakeTokenXXXXXX__factory {
    return super.connect(signer) as FakeTokenXXXXXX__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FakeTokenXXXXXXInterface {
    return new utils.Interface(_abi) as FakeTokenXXXXXXInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FakeTokenXXXXXX {
    return new Contract(address, _abi, signerOrProvider) as FakeTokenXXXXXX;
  }
}
