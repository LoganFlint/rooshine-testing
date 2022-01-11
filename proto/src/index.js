import * as $protobuf from "protobufjs/minimal.js";
import { isv, google } from "./proto.js";

// re-export protobuf reader for usage by @hashgraph/sdk
export const Reader = $protobuf.Reader;
export const Writer = $protobuf.Writer;

export const IsvTransaction = isv.IsvTransaction;
export const IsvSignature = isv.IsvSignature;
export const IsvTransactionBody = isv.IsvTransactionBody;
export const InitContract = isv.InitContract;
export const Cash = isv.Cash;
export const GrantKyc = isv.GrantKyc;
export const RevokeKyc = isv.RevokeKyc;
export const MintBarrelToken = isv.MintBarrelToken;
export const BottleToken = isv.BottleToken;
export const CreateAuction = isv.CreateAuction;
export const ReservePrice = isv.ReservePrice;
export const CloseAuction = isv.CloseAuction;
export const Bid = isv.Bid;
export const CancelBid = isv.CancelBid;
export const RotateReservePriceKey = isv.RotateReservePriceKey;
export const Struct = google.protobuf.Struct;
export const Value = google.protobuf.Value;
export const NullValue = google.protobuf.NullValue;
export const ListValue = google.protobuf.ListValue;
