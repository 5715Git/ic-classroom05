export const idlFactory = ({ IDL }) => {
  const canister_id = IDL.Principal;
  const wasm_module = IDL.Vec(IDL.Nat8);
  const ProposeType = IDL.Variant({
    'stop' : IDL.Null,
    'zero' : IDL.Null,
    'delete' : IDL.Null,
    'create' : IDL.Null,
    'start' : IDL.Null,
    'install' : IDL.Null,
  });
  const anon_class_8_1 = IDL.Service({
    'create_canister' : IDL.Func([], [canister_id], []),
    'cycleBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'delete_canister' : IDL.Func([canister_id], [], ['oneway']),
    'getApproved' : IDL.Func([], [IDL.Bool], ['query']),
    'getMemebers' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'getType' : IDL.Func([], [IDL.Text], ['query']),
    'install_code' : IDL.Func(
        [
          IDL.Vec(IDL.Nat8),
          wasm_module,
          IDL.Variant({
            'reinstall' : IDL.Null,
            'upgrade' : IDL.Null,
            'install' : IDL.Null,
          }),
          canister_id,
        ],
        [],
        ['oneway'],
      ),
    'pid' : IDL.Func([], [IDL.Principal], []),
    'propose' : IDL.Func([ProposeType, IDL.Text], [], []),
    'reset' : IDL.Func([], [], ['oneway']),
    'start_canister' : IDL.Func([canister_id], [], ['oneway']),
    'stop_canister' : IDL.Func([canister_id], [], ['oneway']),
    'vote' : IDL.Func([], [], []),
    'wallet_receive' : IDL.Func([], [IDL.Nat], []),
  });
  return anon_class_8_1;
};
export const init = ({ IDL }) => {
  return [IDL.Nat, IDL.Nat, IDL.Vec(IDL.Principal)];
};
