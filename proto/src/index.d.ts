import * as $protobuf from "protobufjs/minimal.js";
import { isv, google } from "./proto.js";

// re-export protobuf reader and writer for usage by @hashgraph/sdk
import Reader = $protobuf.Reader;
import Writer = $protobuf.Writer;

export { Reader, Writer };

import IIsvTransaction = isv.IIsvTransaction;
import IsvTransaction = isv.IsvTransaction;
import IIsvSignature = isv.IIsvSignature;
import IsvSignature = isv.IsvSignature;
import IIsvTransactionBody = isv.IIsvTransactionBody;
import IsvTransactionBody = isv.IsvTransactionBody;
import IInitContract = isv.IInitContract;
import InitContract = isv.InitContract;
import ICash = isv.ICash;
import Cash = isv.Cash;
import IGrantKyc = isv.IGrantKyc;
import GrantKyc = isv.GrantKyc;
import IRevokeKyc = isv.IRevokeKyc;
import RevokeKyc = isv.RevokeKyc;
import IMintBarrelToken = isv.IMintBarrelToken;
import MintBarrelToken = isv.MintBarrelToken;
import IBottleToken = isv.IBottleToken;
import BottleToken = isv.BottleToken;
import ICreateAuction = isv.ICreateAuction;
import CreateAuction = isv.CreateAuction;
import IReservePrice = isv.IReservePrice;
import ReservePrice = isv.ReservePrice;
import ICloseAuction = isv.ICloseAuction;
import CloseAuction = isv.CloseAuction;
import IBid = isv.IBid;
import Bid = isv.Bid;
import ICancelBid = isv.ICancelBid;
import CancelBid = isv.CancelBid;
import IRotateReservePriceKey = isv.IRotateReservePriceKey;
import RotateReservePriceKey = isv.RotateReservePriceKey;
import IStruct = google.protobuf.IStruct;
import Struct = google.protobuf.Struct;
import IValue = google.protobuf.IValue;
import Value = google.protobuf.Value;
import NullValue = google.protobuf.NullValue;
import IListValue = google.protobuf.IListValue;
import ListValue = google.protobuf.ListValue;

export {
  IIsvTransaction,
  IsvTransaction,
  IIsvSignature,
  IsvSignature,
  IIsvTransactionBody,
  IsvTransactionBody,
  IInitContract,
  InitContract,
  ICash,
  Cash,
  IGrantKyc,
  GrantKyc,
  IRevokeKyc,
  RevokeKyc,
  IMintBarrelToken,
  MintBarrelToken,
  IBottleToken,
  BottleToken,
  ICreateAuction,
  CreateAuction,
  IReservePrice,
  ReservePrice,
  ICloseAuction,
  CloseAuction,
  IBid,
  Bid,
  ICancelBid,
  CancelBid,
  IRotateReservePriceKey,
  RotateReservePriceKey,
  IStruct,
  Struct,
  IValue,
  Value,
  NullValue,
  IListValue,
  ListValue,
};
