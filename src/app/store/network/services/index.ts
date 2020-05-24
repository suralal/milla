import { UpdateNetworkService } from './update-network.service';
import { GetNetworkDetailsService } from './get-selected-network.service';
import { ValidatePINService } from './validate-pin.service';
import { CreateNetworkService } from './create-network.service';
import { GetNetworksService } from './get-networks.service';

export * from './create-network.service';
export * from './get-networks.service';
export * from './validate-pin.service';
export * from './get-selected-network.service';
export * from './update-network.service';

export const NETWORK_SERVICES = [
  CreateNetworkService,
  GetNetworksService,
  ValidatePINService,
  GetNetworkDetailsService,
  UpdateNetworkService
];
