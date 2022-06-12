import Buffer "mo:base/Buffer";
import IC "./ic";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Cycles "mo:base/ExperimentalCycles";
actor class(m : Nat, n : Nat ,init_members:[Principal]) = self {
  private let CYCLE_LIMIT = 2_000_000_000;
  let ic : IC.Self = actor("aaaaa-aa");
  public type ProposeType = {
    #zero;
    #create;
    #delete;  
    #install;
    #start;
    #stop;
  };

  var current_propose:ProposeType = #zero;
  var agreed : List.List<Principal> = List.nil();
  var approved : Bool = false;
  private stable var members = init_members;

  public query func getMemebers () : async ([Principal]) {
    members
  };

  public query func getType () : async Text {
    if(current_propose==#create){ return "create"};
    if(current_propose==#zero){return"none"};
    if(current_propose==#install){return"install"};
    if(current_propose==#delete){return"delete"};
    return ""
  };

  public query func getApproved () : async Bool {
    approved
  };

  public shared (msg) func propose(propose_type : ProposeType, desc : Text) : async (){
    assert(isMember(msg.caller));
    assert(current_propose == #zero);
    current_propose := propose_type;
    reset();
  };

  public shared(msg) func pid () :async Principal {
    msg.caller
  };

  public shared (msg) func vote() : async (){
    assert(isMember(msg.caller));
    assert(isVote(msg.caller));
    agreed := List.push(msg.caller, agreed);
    if(List.size(agreed) > n) approved := true;
  };

  func isMember(principal: Principal): Bool {
    for (p in members.vals()) {
      if (Principal.toText(principal) == Principal.toText(p)) {
        return true;
      };
    };
    return false;
  };

    func isVote(principal: Principal): Bool {
    for(p in Iter.fromList(agreed)) {
      if (Principal.toText(principal) == Principal.toText(p)) {
        return true;
      };
    };
    return false;
  };

  public func reset() {
    agreed := List.nil();
    approved := false;
    current_propose := #zero;
  };

  public func create_canister () :async IC.canister_id {
    assert(current_propose==#create and approved==true);
    reset();
    let settings = {
      freezing_threshold = null;
      controllers = ?[Principal.fromActor(self)];
      memory_allocation = null;
      compute_allocation = null;
    };
    Cycles.add(CYCLE_LIMIT);
    let result = await ic.create_canister({ settings = ?settings;});
    result.canister_id
    
  };

  public func install_code (
    _arg : [Nat8],
    _wasm_module : IC.wasm_module,
    _mode : { #reinstall; #upgrade; #install },
    _canister_id : IC.canister_id
  ) {
    assert(current_propose==#install and approved==true);
    await ic.install_code({
      arg = _arg;
      wasm_module = _wasm_module;
      mode = _mode;
      canister_id = _canister_id;
    });
    reset();
  };

  public func start_canister (_canister_id : IC.canister_id) {
    await ic.start_canister({ canister_id = _canister_id });
  };

  public func stop_canister (_canister_id : IC.canister_id) {
    await ic.stop_canister({ canister_id = _canister_id });
  };

  public func delete_canister (_canister_id : IC.canister_id) {
    assert(current_propose==#delete and approved==true);
    await ic.delete_canister({ canister_id = _canister_id });
    reset();
  };

  public query({caller}) func cycleBalance(): async Nat{
    Cycles.balance()
  };

  public shared({caller}) func wallet_receive(): async Nat {
    Cycles.accept(Cycles.available())
  };

};