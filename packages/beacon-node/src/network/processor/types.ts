import {Message} from "@libp2p/interface-pubsub";
import {Slot, SlotOptionalRoot} from "@lodestar/types";
import {GossipTopic, GossipType} from "../gossip/index.js";
import {PeerIdStr} from "../../util/peerId.js";

export type GossipAttestationsWork = {
  messages: PendingGossipsubMessage[];
};

export type PendingGossipsubMessage = {
  topic: GossipTopic;
  msg: Message;
  // only available for beacon_attestation and aggregate_and_proof
  msgSlot?: Slot;
  msgId: string;
  // TODO: Refactor into accepting string (requires gossipsub changes) for easier multi-threading
  propagationSource: PeerIdStr;
  seenTimestampSec: number;
  startProcessUnixSec: number | null;
};

export type ExtractSlotRootFns = {
  [K in GossipType]?: (data: Uint8Array) => SlotOptionalRoot | null;
};
