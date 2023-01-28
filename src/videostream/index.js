"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var react = require("react");
var amazonKinesisVideoStreamsWebrtc = require("amazon-kinesis-video-streams-webrtc");
var clientKinesisVideo = require("@aws-sdk/client-kinesis-video");
var clientKinesisVideoSignaling = require("@aws-sdk/client-kinesis-video-signaling");
var uuid = require("uuid");

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function () {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P
      ? value
      : new P(function (resolve) {
          resolve(value);
        });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done
        ? resolve(result.value)
        : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: [],
    },
    f,
    y,
    t,
    g;
  return (
    (g = { next: verb(0), throw: verb(1), return: verb(2) }),
    typeof Symbol === "function" &&
      (g[Symbol.iterator] = function () {
        return this;
      }),
    g
  );
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (
          ((f = 1),
          y &&
            (t =
              op[0] & 2
                ? y["return"]
                : op[0]
                ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                : y.next) &&
            !(t = t.call(y, op[1])).done)
        )
          return t;
        if (((y = 0), t)) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (
              !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
              (op[0] === 6 || op[0] === 2)
            ) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var ERROR_CHANNEL_ARN_MISSING = "Missing channel ARN";
var ERROR_ICE_CANDIDATE_NOT_FOUND = "No ice candidate found";
var ERROR_ICE_SERVERS_RESPONSE = "Could not get ice servers response";
var ERROR_PEER_CONNECTION_LOCAL_DESCRIPTION_REQUIRED =
  "Could not find local description for peer connection";
var ERROR_PEER_CONNECTION_NOT_INITIALIZED =
  "Peer connection has not been initialized";
var ERROR_RESOURCE_ENDPOINT_LIST_MISSING = "Missing ResourceEndpointList";
var ERROR_SIGNALING_CLIENT_NOT_CONNECTED =
  "Signaling client connection has not been established";

var withErrorLog = function (fn) {
  return function (error) {
    console.error(error);
    return fn(error);
  };
};

/**
 * @description Fetches ice servers for a signaling channel.
 **/
function useIceServers(config) {
  var channelARN = config.channelARN,
    channelEndpoint = config.channelEndpoint,
    _a = config.credentials,
    _b = _a === void 0 ? {} : _a,
    _c = _b.accessKeyId,
    accessKeyId = _c === void 0 ? "" : _c,
    _d = _b.secretAccessKey,
    secretAccessKey = _d === void 0 ? "" : _d,
    _e = _b.sessionToken,
    sessionToken = _e === void 0 ? undefined : _e,
    region = config.region;
  var _f = react.useState(),
    error = _f[0],
    setError = _f[1];
  var _g = react.useState(),
    iceServers = _g[0],
    setIceServers = _g[1];
  react.useEffect(
    function () {
      if (!channelEndpoint) {
        return;
      }
      var isCancelled = false;
      var kinesisVideoSignalingChannelsClient =
        new clientKinesisVideoSignaling.KinesisVideoSignalingClient({
          region: region,
          credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            sessionToken: sessionToken,
          },
          endpoint: channelEndpoint,
        });
      var getIceServerConfigCommand =
        new clientKinesisVideoSignaling.GetIceServerConfigCommand({
          ChannelARN: channelARN,
        });
      kinesisVideoSignalingChannelsClient
        .send(getIceServerConfigCommand)
        .then(function (getIceServerConfigResponse) {
          var _a;
          if (!getIceServerConfigResponse) {
            throw new Error(ERROR_ICE_SERVERS_RESPONSE);
          }
          if (!getIceServerConfigResponse.IceServerList) {
            throw new Error(ERROR_ICE_SERVERS_RESPONSE);
          }
          var dict = [
            {
              urls: "stun:stun.kinesisvideo.".concat(
                region,
                ".amazonaws.com:443"
              ),
            },
          ];
          (_a =
            getIceServerConfigResponse === null ||
            getIceServerConfigResponse === void 0
              ? void 0
              : getIceServerConfigResponse.IceServerList) === null ||
          _a === void 0
            ? void 0
            : _a.forEach(function (iceServer) {
                dict.push({
                  urls: iceServer.Uris,
                  username: iceServer.Username,
                  credential: iceServer.Password,
                });
              });
          return dict;
        })
        .then(function (iceServers) {
          if (isCancelled) {
            return;
          }
          setIceServers(iceServers);
        })
        ["catch"](
          withErrorLog(function (error) {
            if (isCancelled) {
              return;
            }
            setError(error);
          })
        );
      return function cleanup() {
        isCancelled = true;
      };
    },
    [accessKeyId, channelARN, channelEndpoint, region, secretAccessKey]
  );
  return { error: error, iceServers: iceServers };
}

/**
 * @description Opens and returns local media stream. Closes stream on cleanup.
 **/
function useLocalMedia(_a) {
  var audio = _a.audio,
    video = _a.video;
  var _b = react.useState(),
    media = _b[0],
    setMedia = _b[1];
  var _c = react.useState(),
    error = _c[0],
    setError = _c[1];
  var isCancelled = react.useRef(false);
  react.useEffect(
    function () {
      if (isCancelled.current) {
        return;
      }
      if (!video && !audio) {
        return;
      }
      var _media;
      navigator.mediaDevices
        .getUserMedia({ video: video, audio: audio })
        .then(function (mediaStream) {
          _media = mediaStream;
          if (isCancelled.current) {
            _media.getTracks().forEach(function (track) {
              track.stop();
            });
            return;
          }
          setMedia(mediaStream);
        })
        ["catch"](
          withErrorLog(function (error) {
            if (isCancelled.current) {
              return;
            }
            setError(error);
          })
        );
      return function cleanup() {
        isCancelled.current = true;
        _media === null || _media === void 0
          ? void 0
          : _media.getTracks().forEach(function (track) {
              track.stop();
            });
      };
    },
    [video, audio, isCancelled]
  );
  var cancel = function () {
    isCancelled.current = true;
  };
  return {
    error: error,
    media: media,
    cancel: cancel,
  };
}

function peerReducer(state, action) {
  var _a, _b;
  switch (action.type) {
    case "add":
      return __assign(
        __assign({}, state),
        ((_a = {}), (_a[action.payload.id] = action.payload), _a)
      );
    case "update":
      return __assign(
        __assign({}, state),
        ((_b = {}),
        (_b[action.payload.id] = __assign(
          __assign({}, state[action.payload.id]),
          action.payload
        )),
        _b)
      );
    case "remove":
      var updated = __assign({}, state);
      delete updated[action.payload.id];
      return updated;
    default:
      return state;
  }
}
var usePeerReducer = function (initialState) {
  return react.useReducer(peerReducer, initialState);
};

/**
 * @description Maps AWS KinesisVideo output to readable format.
 **/
function mapSignalingChannelEndpoints(data) {
  if (!Array.isArray(data.ResourceEndpointList)) {
    throw new Error(ERROR_RESOURCE_ENDPOINT_LIST_MISSING);
  }
  var endpointsByProtocol = data.ResourceEndpointList.reduce(function (
    endpoints,
    endpoint
  ) {
    if (!endpoint.Protocol) {
      return endpoints;
    }
    endpoints[endpoint.Protocol] = endpoint.ResourceEndpoint;
    return endpoints;
  },
  {});
  return endpointsByProtocol;
}
/**
 * @description Fetches signaling channel endpoints.
 **/
function useSignalingChannelEndpoints(config) {
  var channelARN = config.channelARN,
    kinesisVideoClient = config.kinesisVideoClient,
    role = config.role;
  var _a = react.useState(),
    error = _a[0],
    setError = _a[1];
  var _b = react.useState(),
    signalingChannelEndpoints = _b[0],
    setSignalingChannelEndpoints = _b[1];
  if (!channelARN) {
    throw new Error(ERROR_CHANNEL_ARN_MISSING);
  }
  react.useEffect(
    function () {
      var isCancelled = false;
      var command = new clientKinesisVideo.GetSignalingChannelEndpointCommand({
        ChannelARN: channelARN,
        SingleMasterChannelEndpointConfiguration: {
          Protocols: ["WSS", "HTTPS"],
          Role: role,
        },
      });
      kinesisVideoClient
        .send(command)
        .then(mapSignalingChannelEndpoints)
        .then(function (endpoints) {
          if (isCancelled) {
            return;
          }
          setSignalingChannelEndpoints(endpoints);
        })
        ["catch"](
          withErrorLog(function (error) {
            if (isCancelled) {
              return;
            }
            setError(typeof error === "string" ? new Error(error) : error);
          })
        );
      return function cleanup() {
        isCancelled = true;
      };
    },
    [channelARN, kinesisVideoClient, role]
  );
  return { error: error, signalingChannelEndpoints: signalingChannelEndpoints };
}

/**
 * @description Creates a signaling channel.
 **/
function useSignalingClient(config) {
  var channelARN = config.channelARN,
    channelEndpoint = config.channelEndpoint,
    _a = config.credentials,
    _b = _a === void 0 ? {} : _a,
    _c = _b.accessKeyId,
    accessKeyId = _c === void 0 ? "" : _c,
    _d = _b.secretAccessKey,
    secretAccessKey = _d === void 0 ? "" : _d,
    _e = _b.sessionToken,
    sessionToken = _e === void 0 ? undefined : _e,
    clientId = config.clientId,
    region = config.region,
    role = config.role,
    systemClockOffset = config.systemClockOffset;
  var _f = react.useState(),
    signalingClient = _f[0],
    setSignalingClient = _f[1];
  var _g = react.useState(),
    signalingClientError = _g[0],
    setSignalingClientError = _g[1];
  /** Create signaling client when endpoints are available. */
  react.useEffect(
    function () {
      if (!channelEndpoint) {
        return;
      }
      if (!clientId && role === amazonKinesisVideoStreamsWebrtc.Role.VIEWER) {
        return;
      }
      setSignalingClient(
        new amazonKinesisVideoStreamsWebrtc.SignalingClient({
          channelARN: channelARN,
          channelEndpoint: channelEndpoint,
          clientId: clientId,
          credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            sessionToken: sessionToken,
          },
          region: region,
          role: role,
          systemClockOffset: systemClockOffset,
        })
      );
    },
    [
      accessKeyId,
      channelARN,
      channelEndpoint,
      clientId,
      region,
      role,
      secretAccessKey,
      sessionToken,
      systemClockOffset,
    ]
  );
  /** Handle signaling client lifecycle. */
  react.useEffect(
    function () {
      var isCancelled = false;
      function handleSignalingClientError(error) {
        console.error(error);
        if (isCancelled) {
          return;
        }
        setSignalingClientError(error);
      }
      signalingClient === null || signalingClient === void 0
        ? void 0
        : signalingClient.on("error", handleSignalingClientError);
      return function cleanup() {
        isCancelled = true;
        signalingClient === null || signalingClient === void 0
          ? void 0
          : signalingClient.off("error", handleSignalingClientError);
      };
    },
    [signalingClient]
  );
  return { error: signalingClientError, signalingClient: signalingClient };
}

var Logger = /** @class */ (function () {
  function Logger(logger) {
    var _this = this;
    this.logPrefix = "[react-kinesis-webrtc]";
    this._log = function (message, prefix, prefixStyle) {
      var _a;
      (_a = _this.logger) === null || _a === void 0
        ? void 0
        : _a.log(
            "%c"
              .concat(_this.logPrefix, " ")
              .concat(prefixStyle ? "%c" : "")
              .concat(prefix || ""),
            "color: gray;",
            prefixStyle,
            message
          );
    };
    this.log = function (message, prefix, prefixStyle) {
      _this._log(message, prefix, prefixStyle);
    };
    this.logMaster = function (message) {
      _this.log(message, "MASTER:", "color: royalblue; font-weight:bold;");
    };
    this.logViewer = function (message) {
      _this.log(message, "VIEWER:", "color: green; font-weight: bold;");
    };
    this.logger = logger;
  }
  return Logger;
})();
var getLogger = function (_a) {
  var _b = _a === void 0 ? {} : _a,
    _c = _b.debug,
    debug = _c === void 0 ? false : _c;
  return debug ? new Logger(console) : new Logger();
};

/**
 * @description Opens a master connection using an existing signaling channel.
 **/
function useMaster(config) {
  var channelARN = config.channelARN,
    credentials = config.credentials,
    _a = config.debug,
    debug = _a === void 0 ? false : _a,
    region = config.region,
    _b = config.media,
    media = _b === void 0 ? { audio: true, video: true } : _b;
  var logger = react.useRef(getLogger({ debug: debug }));
  var role = amazonKinesisVideoStreamsWebrtc.Role.MASTER;
  var _c = useLocalMedia(media),
    mediaError = _c.error,
    localMedia = _c.media,
    cancelLocalMedia = _c.cancel;
  var _d = usePeerReducer({}),
    peers = _d[0],
    dispatch = _d[1];
  var _e = react.useState(),
    sendIceCandidateError = _e[0],
    setSendIceCandidateError = _e[1];
  var _f = react.useState(false),
    isOpen = _f[0],
    setIsOpen = _f[1];
  var localMediaIsActive = Boolean(localMedia);
  var kinesisVideoClient = react.useRef(
    new clientKinesisVideo.KinesisVideo({
      region: region,
      credentials: credentials,
    })
  );
  var _g = useSignalingChannelEndpoints({
      channelARN: channelARN,
      kinesisVideoClient: kinesisVideoClient.current,
      role: role,
    }),
    signalingChannelEndpointsError = _g.error,
    signalingChannelEndpoints = _g.signalingChannelEndpoints;
  var _h = useIceServers({
      channelARN: channelARN,
      channelEndpoint:
        signalingChannelEndpoints === null ||
        signalingChannelEndpoints === void 0
          ? void 0
          : signalingChannelEndpoints.HTTPS,
      credentials: credentials,
      region: region,
    }),
    iceServersError = _h.error,
    iceServers = _h.iceServers;
  var _j = useSignalingClient({
      channelARN: channelARN,
      channelEndpoint:
        signalingChannelEndpoints === null ||
        signalingChannelEndpoints === void 0
          ? void 0
          : signalingChannelEndpoints.WSS,
      credentials: credentials,
      region: region,
      role: role,
      systemClockOffset: kinesisVideoClient.current.config.systemClockOffset,
    }),
    signalingClientError = _j.error,
    signalingClient = _j.signalingClient;
  // this dict. is used to perform cleanup tasks
  var peerCleanup = react.useRef({});
  var addPeer = react.useCallback(
    function (id, peer) {
      dispatch({
        type: "add",
        payload: __assign(__assign({}, peer), { isWaitingForMedia: true }),
      });
    },
    [dispatch]
  );
  var removePeer = react.useCallback(
    function (id) {
      dispatch({ type: "remove", payload: { id: id } });
    },
    [dispatch]
  );
  var updatePeer = react.useCallback(
    function (id, update) {
      return dispatch({
        type: "update",
        payload: __assign({ id: id }, update),
      });
    },
    [dispatch]
  );
  var externalError =
    signalingChannelEndpointsError ||
    signalingClientError ||
    iceServersError ||
    sendIceCandidateError;
  /* Cancel the local media stream when an error occurs */
  react.useEffect(
    function () {
      if (!externalError) {
        return;
      }
      logger.current.logMaster("cancelling local media stream");
      cancelLocalMedia();
    },
    [externalError, cancelLocalMedia]
  );
  /**
   * Handle signaling client events.
   *
   * - This effect is designed to be invoked once per master session.
   * */
  react.useEffect(
    function () {
      if (!signalingClient || !iceServers || !localMediaIsActive) {
        return;
      }
      if (externalError) {
        logger.current.logMaster(
          "cleaning up signaling client after error: ".concat(
            externalError.message
          )
        );
        return cleanup();
      }
      function cleanup() {
        logger.current.logMaster("cleaning up peer connections");
        signalingClient === null || signalingClient === void 0
          ? void 0
          : signalingClient.close();
        signalingClient === null || signalingClient === void 0
          ? void 0
          : signalingClient.off("sdpOffer", handleSignalingClientSdpOffer);
        signalingClient === null || signalingClient === void 0
          ? void 0
          : signalingClient.off("open", handleSignalingClientOpen);
        setIsOpen(false);
        for (
          var _i = 0, _a = Object.entries(peerCleanup.current);
          _i < _a.length;
          _i++
        ) {
          var _b = _a[_i],
            id = _b[0],
            fn = _b[1];
          fn();
          removePeer(id);
          delete peerCleanup.current[id];
        }
      }
      /* sdp offer = new peer connection */
      function handleSignalingClientSdpOffer(offer, id) {
        return __awaiter(this, void 0, void 0, function () {
          function handleIceCandidate(_a) {
            var candidate = _a.candidate;
            logger.current.logMaster("received ice candidate");
            if (candidate) {
              try {
                signalingClient === null || signalingClient === void 0
                  ? void 0
                  : signalingClient.sendIceCandidate(candidate, id);
              } catch (error) {
                setSendIceCandidateError(error);
              }
            }
          }
          function handleIceConnectionStateChange() {
            var _a, _b;
            logger.current.logMaster(
              "ice connection state change: ".concat(
                connection.iceConnectionState
              )
            );
            if (
              ["closed", "disconnected", "failed"].includes(
                connection.iceConnectionState
              )
            ) {
              removePeer(id);
              (_b = (_a = peerCleanup.current)[id]) === null || _b === void 0
                ? void 0
                : _b.call(_a);
              delete peerCleanup.current[id];
            }
          }
          function handleTrack(_a) {
            var _b = _a.streams,
              streams = _b === void 0 ? [] : _b;
            logger.current.logMaster("received peer track");
            media = streams[0];
            updatePeer(id, { media: media });
          }
          var connection, media, _a, _b;
          return __generator(this, function (_c) {
            switch (_c.label) {
              case 0:
                logger.current.logMaster("received sdp offer");
                connection = new RTCPeerConnection({
                  iceServers: iceServers,
                  iceTransportPolicy: "all",
                });
                connection.addEventListener("icecandidate", handleIceCandidate);
                connection.addEventListener("track", handleTrack);
                connection.addEventListener(
                  "iceconnectionstatechange",
                  handleIceConnectionStateChange
                );
                addPeer(id, { id: id, connection: connection });
                peerCleanup.current[id] = function () {
                  logger.current.logMaster("cleaning up peer ".concat(id));
                  media === null || media === void 0
                    ? void 0
                    : media.getTracks().forEach(function (track) {
                        track.stop();
                      });
                  connection.close();
                  connection.removeEventListener(
                    "icecandidate",
                    handleIceCandidate
                  );
                  connection.removeEventListener("track", handleTrack);
                  connection.removeEventListener(
                    "iceconnectionstatechange",
                    handleIceConnectionStateChange
                  );
                };
                return [4 /*yield*/, connection.setRemoteDescription(offer)];
              case 1:
                _c.sent();
                _b = (_a = connection).setLocalDescription;
                return [
                  4 /*yield*/,
                  connection.createAnswer({
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true,
                  }),
                ];
              case 2:
                return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
              case 3:
                _c.sent();
                signalingClient === null || signalingClient === void 0
                  ? void 0
                  : signalingClient.sendSdpAnswer(
                      connection.localDescription,
                      id
                    );
                return [2 /*return*/];
            }
          });
        });
      }
      function handleSignalingClientOpen() {
        setIsOpen(true);
      }
      signalingClient.on("sdpOffer", handleSignalingClientSdpOffer);
      signalingClient.on("open", handleSignalingClientOpen);
      signalingClient.open();
      return cleanup;
    },
    [
      addPeer,
      externalError,
      iceServers,
      localMediaIsActive,
      logger,
      peerCleanup,
      removePeer,
      signalingClient,
      updatePeer,
    ]
  );
  /* Handle peer side effects */
  react.useEffect(
    function () {
      var _loop_1 = function (peer) {
        if (peer.isWaitingForMedia) {
          if (!localMedia) {
            return "continue";
          }
          localMedia.getTracks().forEach(function (track) {
            var _a;
            (_a = peer.connection) === null || _a === void 0
              ? void 0
              : _a.addTrack(track, localMedia);
          });
          dispatch({
            type: "update",
            payload: { id: peer.id, isWaitingForMedia: false },
          });
        }
      };
      for (var _i = 0, _a = Object.values(peers); _i < _a.length; _i++) {
        var peer = _a[_i];
        _loop_1(peer);
      }
    },
    [dispatch, localMedia, peers]
  );
  logger.current.logMaster({ peers: peers });
  return {
    _signalingClient: signalingClient,
    error: mediaError || externalError,
    isOpen: isOpen,
    localMedia: localMedia,
    peers: Object.values(peers),
  };
}

/**
 * @description Opens a viewer connection to an active master signaling channel.
 **/
function useViewer(config) {
  var channelARN = config.channelARN,
    credentials = config.credentials,
    debug = config.debug,
    region = config.region,
    media = config.media;
  var _a = useLocalMedia(media || { audio: false, video: false }),
    streamError = _a.error,
    localMedia = _a.media;
  var logger = react.useRef(getLogger({ debug: debug }));
  var role = amazonKinesisVideoStreamsWebrtc.Role.VIEWER;
  var clientId = react.useRef(uuid.v4());
  var kinesisVideoClientRef = react.useRef(
    new clientKinesisVideo.KinesisVideo({
      region: region,
      credentials: credentials,
    })
  );
  var kinesisVideoClient = kinesisVideoClientRef.current;
  var _b = react.useState(),
    peerConnection = _b[0],
    setPeerConnection = _b[1];
  var _c = react.useState(),
    peerMedia = _c[0],
    setPeerMedia = _c[1];
  var _d = react.useState(),
    peerError = _d[0],
    setPeerError = _d[1];
  var viewerOnly = !Boolean(media);
  var localMediaIsActive = Boolean(localMedia);
  var _e = useSignalingChannelEndpoints({
      channelARN: channelARN,
      kinesisVideoClient: kinesisVideoClient,
      role: role,
    }),
    signalingChannelEndpointsError = _e.error,
    signalingChannelEndpoints = _e.signalingChannelEndpoints;
  var _f = useIceServers({
      channelARN: channelARN,
      channelEndpoint:
        signalingChannelEndpoints === null ||
        signalingChannelEndpoints === void 0
          ? void 0
          : signalingChannelEndpoints.HTTPS,
      credentials: credentials,
      region: region,
    }),
    iceServersError = _f.error,
    iceServers = _f.iceServers;
  var _g = useSignalingClient({
      channelARN: channelARN,
      channelEndpoint:
        signalingChannelEndpoints === null ||
        signalingChannelEndpoints === void 0
          ? void 0
          : signalingChannelEndpoints.WSS,
      clientId: clientId.current,
      credentials: credentials,
      region: region,
      role: role,
      systemClockOffset: kinesisVideoClient.config.systemClockOffset,
    }),
    signalingClientError = _g.error,
    signalingClient = _g.signalingClient;
  var depsError =
    signalingChannelEndpointsError || iceServersError || signalingClientError;
  var peer = {
    id: clientId.current,
    connection: peerConnection,
    media: peerMedia,
  };
  /** Initialize the peer connection with ice servers. */
  react.useEffect(
    function () {
      if (!iceServers) {
        return;
      }
      // in order to prevent certain race conditions, ensure the local media stream is active
      // before initializing the peer connection (one-way viewers are exempt)
      if (!viewerOnly && !localMediaIsActive) {
        return;
      }
      setPeerConnection(
        new RTCPeerConnection({
          iceServers: iceServers,
          iceTransportPolicy: "all",
        })
      );
    },
    [localMediaIsActive, iceServers, viewerOnly]
  );
  /** Handle signaling client and remote peer lifecycle. */
  react.useEffect(
    function () {
      if (!peerConnection || !signalingClient) {
        return;
      }
      function handleSignalingClientOpen() {
        return __awaiter(this, void 0, void 0, function () {
          var sessionDescription, error_1;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                logger.current.logViewer(
                  "[".concat(clientId.current, "] signaling client opened")
                );
                if (viewerOnly) {
                  peerConnection === null || peerConnection === void 0
                    ? void 0
                    : peerConnection.addTransceiver("video");
                  peerConnection === null || peerConnection === void 0
                    ? void 0
                    : peerConnection.getTransceivers().forEach(function (t) {
                        return (t.direction = "recvonly");
                      });
                }
                return [
                  4 /*yield*/,
                  peerConnection === null || peerConnection === void 0
                    ? void 0
                    : peerConnection.createOffer({
                        offerToReceiveAudio: true,
                        offerToReceiveVideo: true,
                      }),
                ];
              case 1:
                sessionDescription = _a.sent();
                _a.label = 2;
              case 2:
                _a.trys.push([2, 4, , 5]);
                return [
                  4 /*yield*/,
                  peerConnection === null || peerConnection === void 0
                    ? void 0
                    : peerConnection.setLocalDescription(sessionDescription),
                ];
              case 3:
                _a.sent();
                return [3 /*break*/, 5];
              case 4:
                error_1 = _a.sent();
                console.error(error_1);
                return [2 /*return*/, setPeerError(error_1)];
              case 5:
                if (
                  !(peerConnection === null || peerConnection === void 0
                    ? void 0
                    : peerConnection.localDescription)
                ) {
                  return [
                    2 /*return*/,
                    setPeerError(
                      new Error(
                        ERROR_PEER_CONNECTION_LOCAL_DESCRIPTION_REQUIRED
                      )
                    ),
                  ];
                }
                logger.current.logViewer(
                  "[".concat(clientId.current, "] sending sdp offer")
                );
                signalingClient === null || signalingClient === void 0
                  ? void 0
                  : signalingClient.sendSdpOffer(
                      peerConnection.localDescription
                    );
                return [2 /*return*/];
            }
          });
        });
      }
      function handleSignalingClientSdpAnswer(answer) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                logger.current.logViewer(
                  "[".concat(clientId.current, "] received sdp answer")
                );
                if (!peerConnection) {
                  throw new Error(ERROR_PEER_CONNECTION_NOT_INITIALIZED);
                }
                return [
                  4 /*yield*/,
                  peerConnection.setRemoteDescription(answer),
                ];
              case 1:
                _a.sent();
                return [2 /*return*/];
            }
          });
        });
      }
      function handleSignalingChannelIceCandidate(candidate) {
        logger.current.logViewer(
          "[".concat(
            clientId.current,
            "] received signaling channel ice candidate"
          )
        );
        if (!candidate) {
          throw new Error(ERROR_ICE_CANDIDATE_NOT_FOUND);
        }
        if (!peerConnection) {
          throw new Error(ERROR_PEER_CONNECTION_NOT_INITIALIZED);
        }
        peerConnection === null || peerConnection === void 0
          ? void 0
          : peerConnection.addIceCandidate(candidate);
      }
      function handlePeerIceCandidate(_a) {
        var candidate = _a.candidate;
        logger.current.logViewer(
          "[".concat(clientId.current, "] received peer ice candidate")
        );
        if (!signalingClient) {
          throw new Error(ERROR_SIGNALING_CLIENT_NOT_CONNECTED);
        }
        if (candidate) {
          signalingClient.sendIceCandidate(candidate);
        }
      }
      function handlePeerTrack(_a) {
        var _b = _a.streams,
          streams = _b === void 0 ? [] : _b;
        logger.current.logViewer(
          "[".concat(clientId.current, "] received peer track")
        );
        setPeerMedia(streams[0]);
      }
      signalingClient.on("open", handleSignalingClientOpen);
      signalingClient.on("sdpAnswer", handleSignalingClientSdpAnswer);
      signalingClient.on("iceCandidate", handleSignalingChannelIceCandidate);
      signalingClient.open();
      peerConnection.addEventListener("icecandidate", handlePeerIceCandidate);
      peerConnection.addEventListener("track", handlePeerTrack);
      return function cleanup() {
        logger.current.logViewer("[".concat(clientId.current, "] cleanup"));
        signalingClient.off("open", handleSignalingClientOpen);
        signalingClient.off("sdpAnswer", handleSignalingClientSdpAnswer);
        signalingClient.off("iceCandidate", handleSignalingChannelIceCandidate);
        signalingClient.close();
        peerConnection.removeEventListener(
          "icecandidate",
          handlePeerIceCandidate
        );
        peerConnection.removeEventListener("track", handlePeerTrack);
        peerConnection.close();
      };
    },
    [
      clientId,
      localMediaIsActive,
      logger,
      peerConnection,
      signalingClient,
      viewerOnly,
    ]
  );
  /** Handle peer media lifecycle. */
  react.useEffect(
    function () {
      return function cleanup() {
        peerMedia === null || peerMedia === void 0
          ? void 0
          : peerMedia.getTracks().forEach(function (track) {
              return track.stop();
            });
      };
    },
    [peerMedia]
  );
  /** Send local media stream to remote peer. */
  react.useEffect(
    function () {
      if (!localMedia || !peer.connection) {
        return;
      }
      localMedia.getTracks().forEach(function (track) {
        peer.connection.addTrack(track, localMedia);
      });
    },
    [localMedia, peer.connection]
  );
  return {
    _signalingClient: signalingClient,
    error: depsError || streamError || peerError,
    localMedia: localMedia,
    peer: peer,
  };
}

exports.useMaster = useMaster;
exports.useViewer = useViewer;
//# sourceMappingURL=index.js.map
