import { GetNetworksEffect } from './get-networks.effect';
import { GetNetworkDetailsEffect } from './get-selected-network.effect';

export * from './get-networks.effect';
export * from './get-selected-network.effect';

export const NETWORK_EFFECTS = [GetNetworksEffect, GetNetworkDetailsEffect];
