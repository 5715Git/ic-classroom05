import type { Principal } from '@dfinity/principal';
export type ProposeType = { 'stop' : null } |
  { 'zero' : null } |
  { 'delete' : null } |
  { 'create' : null } |
  { 'start' : null } |
  { 'install' : null };
export interface anon_class_8_1 {
  'create_canister' : () => Promise<canister_id>,
  'cycleBalance' : () => Promise<bigint>,
  'delete_canister' : (arg_0: canister_id) => Promise<undefined>,
  'getApproved' : () => Promise<boolean>,
  'getMemebers' : () => Promise<Array<Principal>>,
  'getType' : () => Promise<string>,
  'install_code' : (
      arg_0: Array<number>,
      arg_1: wasm_module,
      arg_2: { 'reinstall' : null } |
        { 'upgrade' : null } |
        { 'install' : null },
      arg_3: canister_id,
    ) => Promise<undefined>,
  'pid' : () => Promise<Principal>,
  'propose' : (arg_0: ProposeType, arg_1: string) => Promise<undefined>,
  'reset' : () => Promise<undefined>,
  'start_canister' : (arg_0: canister_id) => Promise<undefined>,
  'stop_canister' : (arg_0: canister_id) => Promise<undefined>,
  'vote' : () => Promise<undefined>,
  'wallet_receive' : () => Promise<bigint>,
}
export type canister_id = Principal;
export type wasm_module = Array<number>;
export interface _SERVICE extends anon_class_8_1 {}
