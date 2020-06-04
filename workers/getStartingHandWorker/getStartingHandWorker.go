package main

import (
	"encoding/json"
	"io/ioutil"
	"math/rand"
	"os"
	"strings"
	"time"

	"github.com/streadway/amqp"
	"github.com/withmandala/go-log"
)

const (
	queue                       = "getStartingHand"
	exchange                    = "main"
	url                         = "amqp://guest:guest@localhost:5672/"
	connectionRMQReconnectDelay = 5 * time.Second
	channelRMQReconnectDelay    = 3 * time.Second
)

type resultReply struct {
}

//var connectionRMQ *amqp.Connection
//var channelConsumeRMQ *amqp.Channel
//var channelPublishRMQ *amqp.Channel

/*
const (
	// Time allowed to write a message to the peer.
	writeWait = 10 * time.Second

	// Maximum message size allowed from peer.
	maxMessageSize = 2048

	// Time allowed to read the next pong message from the peer.
	pongWait = 10 * time.Second

	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Time to wait before force close on connection.
	closeGracePeriod = 10 * time.Second
)
*/
//var addr = flag.String("addr", "localhost:8080", "http service address")

//var upgrader = websocket.Upgrader{} // use default options
//var upgrader = websocket.Upgrader{EnableCompression: true} // with Experimental Compression
var loggerInfo = log.New(os.Stdout).WithDebug()

//var connectionRabbitMQ *amqp.Connection
//var channelRabbitMQ *amqp.Channel
//var  chan amqp.Delivery

//var conn = *amqp.Connection

/* func failOnError(err error, msg string) {
	if err != nil {
		loggerInfo.Fatalf("%s: %s", msg, err)
	}
} */

/*
func initRabbitMQ() {
	connectionRabbitMQ, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	failOnError(err, "Failed to connect to RabbitMQ")
	defer connectionRabbitMQ.Close()

	channelRabbitMQ, err := connectionRabbitMQ.Channel()
	failOnError(err, "Failed to open a channel")
	defer channelRabbitMQ.Close()

	messagesRabbitMQ, err := channelRabbitMQ.Consume(
		"WebsocketWorker", // queue
		"",                // consumer
		true,              // auto-ack
		false,             // exclusive
		false,             // no-local
		false,             // no-wait
		nil,               // args
	)
	failOnError(err, "Failed to register a consumer")
	//return conn, ch, nil
}
*/

/* func functionName() string {
	pc := make([]uintptr, 15)
	n := runtime.Callers(2, pc)
	frames := runtime.CallersFrames(pc[:n])
	frame, _ := frames.Next()
	return frame.Function
} */

/* func ping(ws *websocket.Conn) {
	ticker := time.NewTicker(pingPeriod)
	defer ticker.Stop()
	for {
		<-ticker.C
		loggerInfo.Debug("Sending ping")
		if err := ws.WriteControl(websocket.PingMessage, []byte{}, time.Now().Add(writeWait)); err != nil {
			loggerInfo.Error("ping:", err)
			break
		}
	}

}

func internalError(ws *websocket.Conn, msg string, err error) {
	loggerInfo.Error(msg, err)
	ws.WriteMessage(websocket.TextMessage, []byte("Internal server error."))
} */

/* func writeWebsocket(ws *websocket.Conn, chanMessage chan []byte) {
	loggerInfo.Debug("Writer started")
	for {
		message := <-chanMessage
		err := ws.WriteMessage(websocket.TextMessage, message)
		if err != nil {
			loggerInfo.Debug("write:", err)
		}
		loggerInfo.Debugf("Sent to websocket: %s", message)
	}
}

func readWebsocket(ws *websocket.Conn, chanMessage chan []byte) {
	defer ws.Close()
	ws.SetReadLimit(maxMessageSize)
	ws.SetReadDeadline(time.Now().Add(pongWait))
	ws.SetPongHandler(func(string) error { ws.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		_, message, err := ws.ReadMessage()
		if err != nil {
			loggerInfo.Error("read: ", err)
			break
		}
		loggerInfo.Debugf("Recv from websocket: %s", message)
		if json.Valid(message) {
			loggerInfo.Debug("Valid JSON, sending to RabbitMQ")
			chanMessage <- message
		} else {
			loggerInfo.Warn("Incorrect JSON!")
		}

	}
} */

/* func publishRabbitMQ(chanRabbitMQ *amqp.Channel, chanMessage chan []byte) {
	loggerInfo.Debug("Publisher started")
	for {
		//message := <-chanMessage
		var message map[string]interface{}
		var messageContentEncoding string = ""
		if err := json.Unmarshal(<-chanMessage, &message); err != nil {
			loggerInfo.Error("Can't parse JSON. Error: ", err)
		}
		//loggerInfo.Debug("Parsed JSON: ", message)
		loggerInfo.Debug("Operation: ", message["operation"])
		loggerInfo.Trace("Data: ", message["data"])
		dataJSON, err := json.Marshal(message["data"])
		if err != nil {
			loggerInfo.Error("Can't convert data to JSON. Error: ", err)
			continue
		}

		loggerInfo.Debug("Full data size: ", len(dataJSON))
		if len(dataJSON) > 100 {
			compressedData := new(bytes.Buffer)
			compressor, _ := flate.NewWriter(compressedData, 5)
			compressor.Write(dataJSON)
			compressor.Close()
			dataJSON = compressedData.Bytes()
			messageContentEncoding = "deflate"
			loggerInfo.Debug("Compressed data size: ", len(dataJSON))
		}

		//loggerInfo.Debug("Data in JSON: ", dataJSON)
		routingKey := message["operation"].(string)
		err = chanRabbitMQ.Publish(
			"main",     // exchange
			routingKey, // routing key
			false,      // mandatory
			false,      // immediate
			amqp.Publishing{
				ContentType:     "text/json",
				ContentEncoding: messageContentEncoding,
				Body:            dataJSON,
			})
		loggerInfo.Debugf("Published to RabbitMQ. Routing key: %s, payload: %s", routingKey, string(dataJSON))
		if err != nil {
			loggerInfo.Error("Failed to publish a message. Error: ", err)
			break
		}
	}
}
*/
/*func monitoringRabbitMQ(chanRabbitMQ *amqp.Channel, chanMessage chan []byte) {

	go func() {
		fmt.Printf("closing: %s", <-c.conn.NotifyClose(make(chan *amqp.Error)))
	}()

	chanRabbitMQ.n
	loggerInfo.Debug("Publisher started")
	message := <-chanMessage
	err := chanRabbitMQ.Publish(
		"main",              // exchange
		"StartBattle.Start", // routing key
		false,               // mandatory
		false,               // immediate
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(message),
		})
	loggerInfo.Debugf("Published to RabbitMQ: %s", message)
	failOnError(err, "Failed to publish a message")
}
*/
/* func consumeRabbitMQ(chanRabbitMQ *amqp.Channel, chanMessage chan []byte) {
	loggerInfo.Debug("Consumer started")

	messagesRabbitMQ, err := chanRabbitMQ.Consume(
		queue, // queue
		"",    // consumer
		false, // auto-ack
		false, // exclusive
		false, // no-local
		false, // no-wait
		nil,   // args
	)
	if err != nil {
		loggerInfo.Fatal("Failed to register consumer. Error: ", err)
	}

	for d := range messagesRabbitMQ {
		loggerInfo.Debugf("Consumed from RabbitMQ: %s", d.Body)
		chanMessage <- d.Body

	}
	reason, ok := <-chanRabbitMQ.NotifyClose(make(chan *amqp.Error))
	loggerInfo.Error("Consumer crashed")
	loggerInfo.Warnf("Consumer closed. Reason: %v, ok: %v", reason, ok)

} */

/*
func monitoredRabbitMQChannel(url string) (*amqp.Channel, error) {
	loggerInfo.Debug("Creating monitored RabbitMQ connection...")
	conn, err := amqp.Dial(url)
	if err != nil {
		return nil, err
	}
	loggerInfo.Debug("RabbitMQ connection: ", conn)

	loggerInfo.Debug("Creating monitored RabbitMQ channel...")
	ch, err := conn.Channel()

	if err != nil {
		return nil, err
	}

	loggerInfo.Debug("RabbitMQ channel: ", ch)

	channel := ch
	go func() {
		for {
			loggerInfo.Debug("RabbitMQ channel monitoring started")
			reason, ok := <-channel.NotifyClose(make(chan *amqp.Error))
			loggerInfo.Warnf("RabbitMQ channel closed. Reason: %v, ok: %v", reason, ok)
			for {
				loggerInfo.Debug("Reconnecting RabbitMQ connection...")
				time.Sleep(3 * time.Second)
				conn, err := amqp.Dial(url)
				if err == nil {
					loggerInfo.Debug("RabbitMQ connection reconnected")
					for {
						loggerInfo.Debug("Reconnecting RabbitMQ channel...")
						time.Sleep(3 * time.Second)
						ch, err := conn.Channel()
						if err == nil {
							loggerInfo.Debug("RabbitMQ channel reconnected")
							channel = ch
							break
						}
						loggerInfo.Warnf("Can't reconnect RabbitMQ channel. Error: %v", err)
					}
					break
				}
				loggerInfo.Warnf("Can't reconnect RabbitMQ connection. Error: %v", err)

			}
		}
	}()
	return channel, nil
}
*/

/* connection routine (url, ->pipeConnection)
consumer channel routine (<-pipeConnection, ->pipeChannel)
publisher channel routine (<-pipeConnection, ->pipeChannel)
consumer (<-pipeChannel, ->amqpDelivery)
publisher (<-pipeChannel, <-publishMessageStruct)
publishMessageStruct: (routing key, exchange?, amqp.publish)

processor (<-amqpDelivery, ->publishMessageStruct) */
/*
func monitoredRabbitMQChannel(pipe chan *amqp.Connection, id string) (*amqp.Channel, error) {
	loggerInfo.Debug(id, "- Creating monitored RabbitMQ channel...")
	conn := <-pipe
	channel, err := conn.Channel()

	if err != nil {
		return nil, err
	}

	//	loggerInfo.Debug("RabbitMQ channel: ", ch)

	go func() {
		for {
			loggerInfo.Debug(id, "- RabbitMQ channel monitoring started")
			reason, ok := <-channel.NotifyClose(make(chan *amqp.Error))
			loggerInfo.Warnf("%v - RabbitMQ channel closed. Reason: %v, ok: %v", id, reason, ok)
			//loggerInfo.Error("RabbitMQ connection from pipe: ", conn)
			if ok {
				for {
					loggerInfo.Debug(id, "- Reconnecting RabbitMQ channel...")
					time.Sleep(channelRMQReconnectDelay)
					conn := <-pipe
					ch, err := conn.Channel()
					channel = ch
					if err == nil {
						loggerInfo.Debug(id, "- RabbitMQ channel reconnected")

						//Non-blocking push new connection back to pipe to chain new connection to other RabbitMQ channels
						select {
						case pipe <- conn:
						default:
						}

						break
					}
					loggerInfo.Warnf("%v - Can't reconnect RabbitMQ channel. Error: %v", id, err)
					//loggerInfo.Debug("RabbitMQ connection: ", conn)
				}

			} else {
				loggerInfo.Debug(id, "- Internal close. Nothing to do.")
				break
			}
		}
	}()
	return channel, nil
}
*/
/*
func monitoredRabbitMQConnection(url string, pipe chan *amqp.Connection, id string) (*amqp.Connection, error) {
	loggerInfo.Debug(id, "- Creating monitored RabbitMQ connection...")
	conn, err := amqp.Dial(url)
	if err != nil {
		return nil, err
	}
	//loggerInfo.Debug("RabbitMQ connection: ", conn)
	pipe <- conn
	connection := conn
	go func() {
		for {
			loggerInfo.Debug(id, "- RabbitMQ connection monitoring started")
			reason, ok := <-connection.NotifyClose(make(chan *amqp.Error))
			loggerInfo.Warnf("%v - RabbitMQ connection closed. Reason: %v, ok: %v", id, reason, ok)
			if ok {
				for {
					loggerInfo.Debug(id, "- Reconnecting RabbitMQ connection...")
					time.Sleep(3 * time.Second)
					conn, err := amqp.Dial(url)
					if err == nil {
						loggerInfo.Debug(id, "- RabbitMQ connection reconnected")
						connection = conn
						//loggerInfo.Debug("Reconnected RabbitMQ connection: ", conn)
						pipe <- conn //Send new connection info to the pipe
						break
					}
					loggerInfo.Warnf("%v - Can't reconnect RabbitMQ connection. Error: %v", id, err)
				}
			} else {
				loggerInfo.Debug(id, "- Internal close. Nothing to do.")
				break
			}
		}
	}()
	return connection, nil
}
*/

func processRMQMessage(message amqp.Delivery, channelConsumeRMQ *amqp.Channel, channelPublishRMQ *amqp.Channel) {
	var payloadJSON map[string]interface{}
	//var messageContentEncoding string = ""
	err := json.Unmarshal(message.Body, &payloadJSON)
	if err != nil {
		loggerInfo.Error("Can't parse JSON. Error: ", err)
		return
	}
	//loggerInfo.Debug("Parsed JSON: ", payloadJSON)
	//loggerInfo.Debug("message: ", message.ReplyTo)

	//dataJSON:="{\"result\":\"ok\","preload":{"characters":["aaaabb","aacabb","baaabb","sjdfha","askwoo"],"dimensions":["skelos","dayongeel","alphar"],"card_templates":["common","rare","legend","special","epic"]},"data":[{"imageId":"aaaabb","name":"Ingegärd","power":"1","defense":"3","speed":"5","dimension":"dayongeel","rarity":"common","primaryAbility":"first-strike","secondaryAbility":"power-unity","secondaryAbilityParameters":{"power":"3","turn":"4"},"description":"\"My sword is swift...\""},{"imageId":"aacabb","name":"Gudfinna ","power":"5","defense":"2","speed":"3","dimension":"dayongeel","rarity":"rare","primaryAbility":"last-stand","secondaryAbility":"defense-unity","secondaryAbilityParameters":{"turn":"4"},"description":"\"I will never surrender!\""},{"imageId":"baaabb","name":"Freystein","power":"6","defense":"8","speed":"4","dimension":"skelos","rarity":"legend","primaryAbility":"full-power","secondaryAbility":"power-diversity","secondaryAbilityParameters":{"power":"3","turn":"4"},"description":"\"Unlimited P-O-W-E-R!\""},{"imageId":"sjdfha","name":"Ingifast","power":"2","defense":"5","speed":"1","dimension":"skelos","rarity":"special","primaryAbility":"berserk","secondaryAbility":"powermania","secondaryAbilityParameters":{"power":"2","strike":"4"},"description":"\"Blood... I need more!\""},{"imageId":"askwoo","name":"Svartbrand","power":"2","defense":"9","speed":"1","dimension":"alphar","rarity":"epic","primaryAbility":"reckless","secondaryAbility":"defender","description":"\"Let\'s have some fun!\""}]}'
	replyDataFile, err := os.Open("cardDataFile.txt")
	if err != nil {
		loggerInfo.Error("Can't open data file. Error: ", err)
		return
	}
	defer replyDataFile.Close()
	loggerInfo.Debug("File opened: ", replyDataFile)

	cardData, err := ioutil.ReadAll(replyDataFile)
	if err != nil {
		loggerInfo.Error("Can't read data file. Error: ", err)
		return
	}
	loggerInfo.Debug("File read: ", cardData)

	cardArray := strings.Split(string(cardData), "\n")
	loggerInfo.Debug("Card DB generated: ", cardArray)

	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(cardArray), func(i, j int) { cardArray[i], cardArray[j] = cardArray[j], cardArray[i] })
	loggerInfo.Debug("Card DB shuffled: ", cardArray)

	selectedCardsSlice := cardArray[0:5]
	loggerInfo.Debug("Card DB sliced: ", selectedCardsSlice)

	selectedCardsJSONArray := `{"result":"ok","preload":{"characters":["aaaabb","aacabb","baaabb","sjdfha","askwoo"],"dimensions":["skelos","dayongeel","alphar"],"card_templates":["common","rare","legend","special","epic"]},"data":[`
	selectedCardsJSONArray += strings.Join(selectedCardsSlice, ",")
	selectedCardsJSONArray += `]}`
	loggerInfo.Debug("Prepared reply: ", selectedCardsJSONArray)

	routingKey := message.ReplyTo
	err = channelPublishRMQ.Publish(
		"",         // exchange
		routingKey, // routing key
		false,      // mandatory
		false,      // immediate
		amqp.Publishing{
			ContentType: "text/json",
			Body:        []byte(selectedCardsJSONArray),
		})
	loggerInfo.Debugf("Published to RabbitMQ. Routing key: %s, payload: %s", routingKey, selectedCardsJSONArray)
	if err != nil {
		loggerInfo.Error("Failed to publish a message. Error: ", err)
		return
	}
	message.Ack(false)
	loggerInfo.Debug("Message acknowledged")
	/* 	loggerInfo.Debug("Operation: ", message["operation"])
	   	loggerInfo.Trace("Data: ", message["data"])
	   	dataJSON, err := json.Marshal(message["data"])
	   	if err != nil {
	   		loggerInfo.Error("Can't convert data to JSON. Error: ", err)
	   		continue
	   	}

	   	loggerInfo.Debug("Full data size: ", len(dataJSON))
	   	if len(dataJSON) > 100 {
	   		compressedData := new(bytes.Buffer)
	   		compressor, _ := flate.NewWriter(compressedData, 5)
	   		compressor.Write(dataJSON)
	   		compressor.Close()
	   		dataJSON = compressedData.Bytes()
	   		messageContentEncoding = "deflate"
	   		loggerInfo.Debug("Compressed data size: ", len(dataJSON))
	   	}
	*/
}

func main() {
	//flag.Parse()
	//log.SetFlags(0)
	//loggerInfo := log.New(os.Stdout).WithDebug()
	/* 	for {
		pipeConnectionRabbitMQ := make(chan *amqp.Connection)
		pipeConsumeChannelRabbitMQ := make(chan *amqp.Channel)
		pipePublishChannelRabbitMQ := make(chan *amqp.Channel)
		pipeMessageExchange := make(chan )

		consumeChannelRabbitMQ, err := monitoredRabbitMQChannel(pipeConnectionRabbitMQ, "[Consumer]")
		if err != nil {
			loggerInfo.Error("consumeChannelRabbitMQ error:", err)
			break
		}
		defer consumeChannelRabbitMQ.Close()

		publishChannelRabbitMQ, err := monitoredRabbitMQChannel(pipeConnectionRabbitMQ, "[Publisher]")
		if err != nil {
			loggerInfo.Error("publishChannelRabbitMQ error:", err)
			break
		}
		defer publishChannelRabbitMQ.Close()

		connectionRabbitMQ, err := monitoredRabbitMQConnection(url, pipeConnectionRabbitMQ, "[Main]")
		if err != nil {
			loggerInfo.Error("monitoredRabbitMQConnection:", err)
			break
		} //failOnError(err, "Failed to connect to RabbitMQ")
		defer connectionRabbitMQ.Close()

		//channelRabbitMQ, err := connectionRabbitMQ.Channel()
		//failOnError(err, "Failed to open a channel")

	} */

	for {
		loggerInfo.Debug("Creating RabbitMQ connection...")
		connectionRMQ, err := amqp.Dial(url)
		if err != nil {
			loggerInfo.Error("Can't create RabbitMQ connection. Error:", err)
			time.Sleep(connectionRMQReconnectDelay)

		}
		if connectionRMQ != nil {
			defer connectionRMQ.Close()
			for {
				//loggerInfo.Debug(channelPublishRMQ.)
				//loggerInfo.Debug((&channelPublishRMQ).Close)

				loggerInfo.Debug("Creating RabbitMQ channel for publishing...")
				channelPublishRMQ, err := connectionRMQ.Channel()

				if err != nil {
					loggerInfo.Error("Can't create RabbitMQ channel for publishing. Error:", err)
					time.Sleep(channelRMQReconnectDelay)
					break
				}
				loggerInfo.Debug(channelPublishRMQ)
				//loggerInfo.Debug(&channelPublishRMQ)
				//}
				loggerInfo.Debug("Creating RabbitMQ channel for consuming...")
				channelConsumeRMQ, err := connectionRMQ.Channel()

				if err != nil {
					loggerInfo.Error("Can't create RabbitMQ channel for consuming. Error:", err)
					time.Sleep(channelRMQReconnectDelay)
					break
				}
				loggerInfo.Debug(channelConsumeRMQ)

				if channelConsumeRMQ != nil {
					//	defer channelRMQ.Close()
					loggerInfo.Debug("Starting consumer...")

					messagesRMQ, err := channelConsumeRMQ.Consume(
						queue, // queue
						"",    // consumer
						false, // auto-ack
						false, // exclusive
						false, // no-local
						false, // no-wait
						nil,   // args
					)
					if err != nil {
						loggerInfo.Fatal("Failed to register consumer. Error: ", err)
					} else {
						loggerInfo.Debug("Step1")
						for d := range messagesRMQ {
							loggerInfo.Debugf("Consumed from RabbitMQ: %s", d.Body)
							go processRMQMessage(d, channelConsumeRMQ, channelPublishRMQ)
						}

					}
					loggerInfo.Debug("Step2")

					time.Sleep(10 * time.Second)
					loggerInfo.Debug("Sleep expired")
					select {
					case reason, ok := <-channelConsumeRMQ.NotifyClose(make(chan *amqp.Error)):
						loggerInfo.Warnf("Consumer channel closed. Reason: %v, ok: %v", reason, ok)
					case reason, ok := <-channelPublishRMQ.NotifyClose(make(chan *amqp.Error)):
						loggerInfo.Warnf("Publishing channel closed. Reason: %v, ok: %v", reason, ok)
					}
					loggerInfo.Debug("Step3")
					channelConsumeRMQ.Close()
					channelPublishRMQ.Close()
					connectionRMQ.Close()
					loggerInfo.Debug("Restarting RabbitMQ channel and connection...")
				}
			}
			reason, ok := <-connectionRMQ.NotifyClose(make(chan *amqp.Error))
			loggerInfo.Warnf("Connection closed. Reason: %v, ok: %v", reason, ok)
			loggerInfo.Debug("Restarting RabbitMQ connection...")
		}
	}

	/* http.HandleFunc("/ws", serveWs)
	http.HandleFunc("/", serveHome)
	fsImages := http.FileServer(http.Dir("./images"))
	http.Handle("/images/", http.StripPrefix("/images/", fsImages))
	fsFonts := http.FileServer(http.Dir("./fonts"))
	http.Handle("/fonts/", http.StripPrefix("/fonts/", fsFonts))
	fsScripts := http.FileServer(http.Dir("./scripts"))
	http.Handle("/scripts/", http.StripPrefix("/scripts/", fsScripts))
	loggerInfo.Fatal(http.ListenAndServe(":8080", nil)) */
}
