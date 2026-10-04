# AI-native database


Install Weaviate Locally Using Docker and ollama 

# 1. Step 

1. Run Weaviate with Docker 

2. Install Client Library 

3. Connect to Weaviate 


## Pull model using ollama 

```
ollama pull nomic-embed-text
ollama pull llama3.2
pulling manifest 
pulling 970aa74c0a90... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏ 274 MB                         
pulling c71d239df917... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏  11 KB                         
pulling ce4a164fc046... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏   17 B                         
pulling 31df23ea7daa... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏  420 B                         
verifying sha256 digest 
writing manifest 
success 
pulling manifest 
pulling dde5aa3fc5ff... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏ 2.0 GB                         
pulling 966de95ca8a6... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏ 1.4 KB                         
pulling fcc5a6bec9da... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏ 7.7 KB                         
pulling a70ff7e570d9... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏ 6.0 KB                         
pulling 56bb8bd477a5... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏   96 B                         
pulling 34bb5ab01051... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏  561 B                         
verifying sha256 digest 
writing manifest 
success 
```

## create a weaviate db 

```
services:
  weaviate:
    command:
    - --host
    - 0.0.0.0
    - --port
    - '8080'
    - --scheme
    - http
    image: cr.weaviate.io/semitechnologies/weaviate:1.30.2
    ports:
    - 8080:8080
    - 50051:50051
    volumes:
    - weaviate_data:/var/lib/weaviate
    restart: on-failure:0
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      ENABLE_API_BASED_MODULES: 'true'
      ENABLE_MODULES: 'text2vec-ollama,generative-ollama'
      CLUSTER_HOSTNAME: 'node1'
volumes:
  weaviate_data:
```

## run docker compose 
```
docker compose up -d 
[+] Running 4/4
 ✔ Network sangambiradar_default        Created                                                 0.0s 
 ✔ Container sangambiradar-postgres-1   Healthy                                                 5.9s 
 ✔ Container sangambiradar-apiserver-1  Healthy                                                13.1s 
 ✔ Container sangambiradar-frontend-1   Started                                                13.3s 
➜  WeaviateLab git:(main) ✗ 
```

setup go-client 

```
go install github.com/weaviate/weaviate-go-client/v4@latest
go: downloading github.com/weaviate/weaviate-go-client/v4 v4.16.1
go: downloading github.com/weaviate/weaviate-go-client v1.1.2
go: github.com/weaviate/weaviate-go-client/v4@latest: module github.com/weaviate/weaviate-go-client/v4@latest found (v4.16.1), but does not contain package github.com/weaviate/weaviate-go-client/v4
```



### create new folder with main.go containt 

```

package main

import (
    "context"
    "fmt"

    "github.com/weaviate/weaviate-go-client/v4/weaviate"
)

func main() {
    cfg := weaviate.Config{
        Host:   "localhost:8080",
        Scheme: "http",
    }

    client, err := weaviate.NewClient(cfg)
    if err != nil {
        fmt.Println(err)
        return
    }

    // Check the connection
    ready, err := client.Misc().ReadyChecker().Do(context.Background())
    if err != nil {
        panic(err)
    }
    fmt.Printf("%v", ready)
}


```

### run golang program 

```

 go mod init github.com/sangam14
go: creating new go.mod: module github.com/sangam14
go: to add module requirements and sums:
        go mod tidy
➜  1_check_readiness git:(main) ✗ go mod tidy
go: finding module for package github.com/weaviate/weaviate-go-client/v4/weaviate
go: found github.com/weaviate/weaviate-go-client/v4/weaviate in github.com/weaviate/weaviate-go-client/v4 v4.16.1
go: downloading github.com/weaviate/weaviate v1.27.0
go: downloading github.com/go-openapi/strfmt v0.23.0
go: downloading golang.org/x/oauth2 v0.23.0
go: downloading github.com/stretchr/testify v1.9.0
go: downloading google.golang.org/grpc v1.66.2
go: downloading google.golang.org/protobuf v1.34.2
go: downloading golang.org/x/net v0.29.0
go: downloading google.golang.org/genproto/googleapis/rpc v0.0.0-20240903143218-8af14fe29dc1
go: downloading golang.org/x/sys v0.25.0
go: downloading github.com/asaskevich/govalidator v0.0.0-20230301143203-a9d515a09cc2
go: downloading github.com/go-openapi/errors v0.22.0
go: downloading github.com/oklog/ulid v1.3.1
go: downloading github.com/go-openapi/validate v0.21.0
go: downloading github.com/go-openapi/swag v0.22.3
go: downloading github.com/mailru/easyjson v0.7.7
go: downloading github.com/josharian/intern v1.0.0
go: downloading golang.org/x/text v0.18.0
go: downloading github.com/go-openapi/loads v0.21.1
go: downloading github.com/go-openapi/jsonpointer v0.19.5
go: downloading github.com/go-openapi/analysis v0.21.2
go: downloading gopkg.in/yaml.v2 v2.4.0
go: downloading github.com/go-openapi/spec v0.20.4
go: downloading github.com/go-openapi/jsonreference v0.20.0
go: downloading github.com/kr/pretty v0.1.0
➜  1_check_readiness git:(main) ✗ go run main.go                 
true%                                                    

```

