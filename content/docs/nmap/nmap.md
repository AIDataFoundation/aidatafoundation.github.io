
## NMAP - Network Mapper 

#####  1. Scanning and Enumeration 

- scanning and enumeration are two commaon techuques for gathering information about hosrs and services on the network.
- scanning is techniques to survey a network for active hosts , open ports and the type of servies running on those ports 
- enumeration is gathering detailed information about the discoveries made using scanning techniques 

##### 2. Phases of an NMAP Scan 


1. **Script Pre-scanning**: Optional phase that runs when requested with options like `--script` or `-sC`. It executes scripts that only need to run once per scan, such as broadcast queries to network services.

2. **Target Enumeration**: Nmap processes the user-provided host specifications (DNS names, IP addresses, CIDR notations) and converts them into a list of IPv4 or IPv6 addresses for scanning.

3. **Host Discovery**: Also known as ping scanning, this phase identifies which target systems are online and worth investigating further. Nmap offers various discovery techniques from ARP requests to TCP/ICMP probes.

4. **Reverse-DNS Resolution**: Nmap looks up DNS names for online hosts to make reports more readable and potentially reveal clues about host functions.

5. **Port Scanning**: The core Nmap operation that sends probes and analyzes responses to classify remote ports as open, closed, or filtered.

6. **Version Detection**: When ports are found open, Nmap can determine the server software running by sending probes and matching responses against a database of service signatures.

7. **OS Detection**: If requested with `-O`, Nmap analyzes subtle differences in network implementations to identify the remote host's operating system.

8. **Traceroute**: An optimized implementation that can find network routes to multiple hosts in parallel using the best available probe packets.

9. **Script Scanning**: Most NSE (Nmap Scripting Engine) scripts run during this phase, performing tasks like vulnerability detection, malware discovery, and information gathering.

10. **Output**: Nmap collects all gathered information and presents it in the requested format (human-readable, XML, etc.).

11. **Script Post-scanning**: Final phase where scripts can process results and deliver reports and statistics, though currently requires user-created scripts.

##### 3. A Quick Note on Ports 


1. **Port Basics**: Ports identify specific network applications on a host. If an IP address is like an apartment complex address, ports are the individual unit numbers that direct traffic to specific applications.

2. **TCP Protocol**: TCP is one of the most common network protocols used on the Internet. It's essentially a language with specific rules that computers follow for communication.

3. **3-Way Handshake**: TCP connections always begin with this essential sequence:
   - Client sends **SYN** (synchronize)
   - Server responds with **SYN/ACK** (synchronize/acknowledge)
   - Client finalizes with **ACK** (acknowledge)

4. **Scanning Advantage**: This predictable handshake makes TCP port scanning efficient - if a port is open, the service will respond to a connection request (SYN) following this protocol.

5. **Nmap Application**: Nmap leverages this TCP behavior during its port scanning phase to determine which ports are open, closed, or filtered on target systems.

##### 4. Nmap Scan Ports 

-  (-sT) Explained

1. **Full Handshake**: The `-sT` option in Nmap performs a TCP connect scan, also known as a "full-open" or "Connect" scan.

2. **Complete Process**: Unlike some other scan types, this scan completes the entire TCP three-way handshake sequence with target ports.

3. **Connection Sequence**: 
   - Client sends SYN packet
   - Server responds with SYN/ACK if port is open
   - Client completes handshake with ACK
   - Client immediately terminates the connection with RST (reset)

4. **Advantages**: This scan is reliable and doesn't require special privileges to run, making it accessible for all users.

5. **Disadvantages**: It's more easily detected by intrusion detection systems and firewalls because it creates full connections, and it's typically slower than other scan types like SYN scans.

### Verify Nmap is installed or not 

```
➜  ~ nmap
Nmap 7.95 ( https://nmap.org )
Usage: nmap [Scan Type(s)] [Options] {target specification}
TARGET SPECIFICATION:
  Can pass hostnames, IP addresses, networks, etc.
  Ex: scanme.nmap.org, microsoft.com/24, 192.168.0.1; 10.0.0-255.1-254
  -iL <inputfilename>: Input from list of hosts/networks
  -iR <num hosts>: Choose random targets
  --exclude <host1[,host2][,host3],...>: Exclude hosts/networks
  --excludefile <exclude_file>: Exclude list from file
HOST DISCOVERY:
  -sL: List Scan - simply list targets to scan
  -sn: Ping Scan - disable port scan
  -Pn: Treat all hosts as online -- skip host discovery
  -PS/PA/PU/PY[portlist]: TCP SYN, TCP ACK, UDP or SCTP discovery to given ports
  -PE/PP/PM: ICMP echo, timestamp, and netmask request discovery probes
  -PO[protocol list]: IP Protocol Ping
  -n/-R: Never do DNS resolution/Always resolve [default: sometimes]
  --dns-servers <serv1[,serv2],...>: Specify custom DNS servers
  --system-dns: Use OS's DNS resolver
  --traceroute: Trace hop path to each host
SCAN TECHNIQUES:
  -sS/sT/sA/sW/sM: TCP SYN/Connect()/ACK/Window/Maimon scans
  -sU: UDP Scan
  -sN/sF/sX: TCP Null, FIN, and Xmas scans
  --scanflags <flags>: Customize TCP scan flags
  -sI <zombie host[:probeport]>: Idle scan
  -sY/sZ: SCTP INIT/COOKIE-ECHO scans
  -sO: IP protocol scan
  -b <FTP relay host>: FTP bounce scan
PORT SPECIFICATION AND SCAN ORDER:
  -p <port ranges>: Only scan specified ports
    Ex: -p22; -p1-65535; -p U:53,111,137,T:21-25,80,139,8080,S:9
  --exclude-ports <port ranges>: Exclude the specified ports from scanning
  -F: Fast mode - Scan fewer ports than the default scan
  -r: Scan ports sequentially - don't randomize
  --top-ports <number>: Scan <number> most common ports
  --port-ratio <ratio>: Scan ports more common than <ratio>
SERVICE/VERSION DETECTION:
  -sV: Probe open ports to determine service/version info
  --version-intensity <level>: Set from 0 (light) to 9 (try all probes)
  --version-light: Limit to most likely probes (intensity 2)
  --version-all: Try every single probe (intensity 9)
  --version-trace: Show detailed version scan activity (for debugging)
SCRIPT SCAN:
  -sC: equivalent to --script=default
  --script=<Lua scripts>: <Lua scripts> is a comma separated list of
           directories, script-files or script-categories
  --script-args=<n1=v1,[n2=v2,...]>: provide arguments to scripts
  --script-args-file=filename: provide NSE script args in a file
  --script-trace: Show all data sent and received
  --script-updatedb: Update the script database.
  --script-help=<Lua scripts>: Show help about scripts.
           <Lua scripts> is a comma-separated list of script-files or
           script-categories.
OS DETECTION:
  -O: Enable OS detection
  --osscan-limit: Limit OS detection to promising targets
  --osscan-guess: Guess OS more aggressively
TIMING AND PERFORMANCE:
  Options which take <time> are in seconds, or append 'ms' (milliseconds),
  's' (seconds), 'm' (minutes), or 'h' (hours) to the value (e.g. 30m).
  -T<0-5>: Set timing template (higher is faster)
  --min-hostgroup/max-hostgroup <size>: Parallel host scan group sizes
  --min-parallelism/max-parallelism <numprobes>: Probe parallelization
  --min-rtt-timeout/max-rtt-timeout/initial-rtt-timeout <time>: Specifies
      probe round trip time.
  --max-retries <tries>: Caps number of port scan probe retransmissions.
  --host-timeout <time>: Give up on target after this long
  --scan-delay/--max-scan-delay <time>: Adjust delay between probes
  --min-rate <number>: Send packets no slower than <number> per second
  --max-rate <number>: Send packets no faster than <number> per second
FIREWALL/IDS EVASION AND SPOOFING:
  -f; --mtu <val>: fragment packets (optionally w/given MTU)
  -D <decoy1,decoy2[,ME],...>: Cloak a scan with decoys
  -S <IP_Address>: Spoof source address
  -e <iface>: Use specified interface
  -g/--source-port <portnum>: Use given port number
  --proxies <url1,[url2],...>: Relay connections through HTTP/SOCKS4 proxies
  --data <hex string>: Append a custom payload to sent packets
  --data-string <string>: Append a custom ASCII string to sent packets
  --data-length <num>: Append random data to sent packets
  --ip-options <options>: Send packets with specified ip options
  --ttl <val>: Set IP time-to-live field
  --spoof-mac <mac address/prefix/vendor name>: Spoof your MAC address
  --badsum: Send packets with a bogus TCP/UDP/SCTP checksum
OUTPUT:
  -oN/-oX/-oS/-oG <file>: Output scan in normal, XML, s|<rIpt kIddi3,
     and Grepable format, respectively, to the given filename.
  -oA <basename>: Output in the three major formats at once
  -v: Increase verbosity level (use -vv or more for greater effect)
  -d: Increase debugging level (use -dd or more for greater effect)
  --reason: Display the reason a port is in a particular state
  --open: Only show open (or possibly open) ports
  --packet-trace: Show all packets sent and received
  --iflist: Print host interfaces and routes (for debugging)
  --append-output: Append to rather than clobber specified output files
  --resume <filename>: Resume an aborted scan
  --noninteractive: Disable runtime interactions via keyboard
  --stylesheet <path/URL>: XSL stylesheet to transform XML output to HTML
  --webxml: Reference stylesheet from Nmap.Org for more portable XML
  --no-stylesheet: Prevent associating of XSL stylesheet w/XML output
MISC:
  -6: Enable IPv6 scanning
  -A: Enable OS detection, version detection, script scanning, and traceroute
  --datadir <dirname>: Specify custom Nmap data file location
  --send-eth/--send-ip: Send using raw ethernet frames or IP packets
  --privileged: Assume that the user is fully privileged
  --unprivileged: Assume the user lacks raw socket privileges
  -V: Print version number
  -h: Print this help summary page.
EXAMPLES:
  nmap -v -A scanme.nmap.org
  nmap -v -sn 192.168.0.0/16 10.0.0.0/8
  nmap -v -iR 10000 -Pn -p 80
SEE THE MAN PAGE (https://nmap.org/book/man.html) FOR MORE OPTIONS AND EXAMPLES


```

try `-sT' option 

`nmap -sT IP_ADDRESS`


Lets setup basic lab using Docker 

```
sudo apt update && sudo apt install docker.io docker-compose 

```

create docker compose file to setup lab 

```
version: '3.8'

services:
  web-server:
    image: nginx:alpine
    container_name: web-server
    ports:
      - "80:80"
    networks:
      nmap-network:
        ipv4_address: 172.28.0.2

  ftp-server:
    image: delfer/alpine-ftp-server
    container_name: ftp-server
    environment:
      - USERS=user:password:1000:1000
    ports:
      - "21:21"
      - "21000-21010:21000-21010"
    networks:
      nmap-network:
        ipv4_address: 172.28.0.3

  ssh-server:
    image: linuxserver/openssh-server
    container_name: ssh-server
    platform: linux/arm64/v8
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/London
      - PASSWORD_ACCESS=true
      - USER_PASSWORD=password
      - USER_NAME=user
    ports:
      - "2222:2222"
    networks:
      nmap-network:
        ipv4_address: 172.28.0.4

  mysql-server:
    image: mariadb:latest
    container_name: db-server
    environment:
      - MYSQL_ROOT_PASSWORD=my-secret-pw
    ports:
      - "3306:3306"
    networks:
      nmap-network:
        ipv4_address: 172.28.0.5

networks:
  nmap-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.28.0.0/16
```

start docker container 

```
docker-compose -f nmap-lab.yml up -d

```

lets see open ports and services on docker containers 

Note > 

	•	-sT: TCP connect scan.
	•	-Pn: skip host discovery (assume hosts are up).
	•	-p 1-65535: scan all ports.

```
nmap -sT -Pn -p 80 172.28.0.2          # Nginx
nmap -sT -Pn -p 21,21000-21010 172.28.0.3  # FTP Server
nmap -sT -Pn -p 2222 172.28.0.4        # SSH Server
nmap -sT -Pn -p 3306 172.28.0.5        # MySQL (MariaDB)
Starting Nmap 7.95 ( https://nmap.org ) at 2025-04-01 03:56 IST
Nmap scan report for 172.28.0.2
Host is up.

PORT   STATE    SERVICE
80/tcp filtered http

Nmap done: 1 IP address (1 host up) scanned in 2.05 seconds
Starting Nmap 7.95 ( https://nmap.org ) at 2025-04-01 03:56 IST
Nmap scan report for 172.28.0.3
Host is up.

PORT      STATE    SERVICE
21/tcp    filtered ftp
21000/tcp filtered irtrans
21001/tcp filtered unknown
21002/tcp filtered unknown
21003/tcp filtered unknown
21004/tcp filtered unknown
21005/tcp filtered unknown
21006/tcp filtered unknown
21007/tcp filtered unknown
21008/tcp filtered unknown
21009/tcp filtered unknown
21010/tcp filtered notezilla-lan

Nmap done: 1 IP address (1 host up) scanned in 7.08 seconds
Starting Nmap 7.95 ( https://nmap.org ) at 2025-04-01 03:56 IST
Nmap scan report for 172.28.0.4
Host is up.

PORT     STATE    SERVICE
2222/tcp filtered EtherNetIP-1

Nmap done: 1 IP address (1 host up) scanned in 2.05 seconds
Starting Nmap 7.95 ( https://nmap.org ) at 2025-04-01 03:56 IST
Nmap scan report for 172.28.0.5
Host is up.

PORT     STATE    SERVICE
3306/tcp filtered mysql

Nmap done: 1 IP address (1 host up) scanned in 2.04 seconds

```

or you can simply do 

```
nmap -sT -Pn -p 80,21,21000-21010,2222,3306 localhost
Starting Nmap 7.95 ( https://nmap.org ) at 2025-04-01 03:59 IST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.00032s latency).
Other addresses for localhost (not scanned): ::1

PORT      STATE SERVICE
21/tcp    open  ftp
80/tcp    open  http
2222/tcp  open  EtherNetIP-1
3306/tcp  open  mysql
21000/tcp open  irtrans
21001/tcp open  unknown
21002/tcp open  unknown
21003/tcp open  unknown
21004/tcp open  unknown
21005/tcp open  unknown
21006/tcp open  unknown
21007/tcp open  unknown
21008/tcp open  unknown
21009/tcp open  unknown
21010/tcp open  notezilla-lan

Nmap done: 1 IP address (1 host up) scanned in 0.03 seconds

```


This is the default scan if running Nmap without root privileges, so the following command is equivalent.

```
nmap localhost                                       
Starting Nmap 7.95 ( https://nmap.org ) at 2025-04-01 04:00 IST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.000040s latency).
Other addresses for localhost (not scanned): ::1
Not shown: 989 closed tcp ports (conn-refused)
PORT      STATE SERVICE
21/tcp    open  ftp
80/tcp    open  http
2222/tcp  open  EtherNetIP-1
3306/tcp  open  mysql
5000/tcp  open  upnp
5678/tcp  open  rrac
7000/tcp  open  afs3-fileserver
9010/tcp  open  sdr
9080/tcp  open  glrpc
9100/tcp  open  jetdirect
49152/tcp open  unknown
```

###  TCP SYN Scan (-sS) – Quick recap:
	
  •	Common name: SYN stealth scan, “half-open” scan.
	•	Handshake steps: SYN → SYN/ACK → immediate RST (reset), no final ACK.
	•	Why “half-open”? The TCP handshake is deliberately left incomplete.
	•	Logging/Stealth:
	•	Typically not logged by applications because connections aren’t fully established.
	•	However, modern firewall and IDS/IPS solutions often detect and flag these “incomplete” TCP connections.
	•	Benefits:
	•	Speed (much faster than full connection scans).
	•	Lower bandwidth (fewer packets).
	•	Privileges required: Root/administrator access.

⸻

🔍 How it compares (-sS vs. -sT):



🚀 Recommended use-case:

Use -sS scans when you:
	•	Want quick results with lower network overhead.
	•	Prefer application-layer stealth (though security systems might still detect it).
	•	Have root privileges available.

Example:

sudo nmap -sS -Pn -p 80,443 target_ip


This scan provides a balanced mix of speed, stealth (at the application layer), and resource efficiency.

```
sudo nmap -sS -Pn -p 80,443 localhost                
Password:
Starting Nmap 7.95 ( https://nmap.org ) at 2025-04-01 04:04 IST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.000089s latency).
Other addresses for localhost (not scanned): ::1

PORT    STATE  SERVICE
80/tcp  open   http
443/tcp closed https

Nmap done: 1 IP address (1 host up) scanned in 0.02 seconds

```

#### UDP(https://www.rfc-editor.org/rfc/rfc768.txt) Scan (-sU) 

- most popular services on internets run ocer TCP protocol , UDP services are widelt deolyed DNS , SNMP and DHCP (rgisted port 53,161/162 and 67/68) are three of the most common 

- UDP scanning is generally slower and more difficult than TCP , some security auditors ignore these ports this is a mistake as exploitable UDP services are quire common and attackers certainly don't ignore the whole protocol. Fortunately , Nmap can help inventort UDP ports 

map also provides some more niche scanning options, including -sA (ACK scan) which may be used to map firewalls, and -sU (UDP scan) for exploring UDP ports. However, these are used much less frequently than the half- or full-connect scans discussed above.


### Nmap Port States 



These are the three primary port states that Nmap will report. They are defined as follows.

- Open – the port is reachable and a service is listening on it.
- Closed – the port is reachable and no service is listening on it.
- Filtered – the port is not reachable so I cannot tell (usually indicates a firewall).


Invoking our previous example, you can see one open port, one filtered port, and 998 closed ports (note that Nmap scans the top 1000 most common ports by default).


### Nmap Options

Deteerming which of the 1000 most common ports might have services listening on them is a good start, but what if we want to check other ports?
of we want to known more about ports we have identified or the services running on them ? 


Port specification 

- `-p <port num>' - Specifies port(s) to scan. can be a single port , a range , a comma-seprated list or ant combination of those 

```
sudo nmap -p 80,443,8080,8443 localhost

```

looking for wev servers? Running Running nmap -p 80,443,8080,8443 is a good net to cast.


- `--top-ports <number of ports>' Select the top <number> common ports 

if your starting big network and scanning the default top 1000 ports to each IP address 

Running `nmap --top-ports 50 `

```
 sudo nmap --top-ports 50 localhost 

```

or 

```
sudo nmap -f  localhost 
Warning: Packet fragmentation selected on a host other than Linux, OpenBSD, FreeBSD, or NetBSD.  This may or may not work.
Starting Nmap 7.95 ( https://nmap.org ) at 2025-04-01 05:01 IST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.000013s latency).
Other addresses for localhost (not scanned): ::1
Not shown: 989 closed tcp ports (reset)
PORT      STATE SERVICE
21/tcp    open  ftp
80/tcp    open  http
2222/tcp  open  EtherNetIP-1
3306/tcp  open  mysql
5000/tcp  open  upnp
5678/tcp  open  rrac
7000/tcp  open  afs3-fileserver
9010/tcp  open  sdr
9080/tcp  open  glrpc
9100/tcp  open  jetdirect
49152/tcp open  unknown

Nmap done: 1 IP address (1 host up) scanned in 0.05 seconds
```


### Host Discovery 

- `-sn` - Disables port-scanning (so that only host discovery is performed)

```
sudo nmap -sn  localhost 
Starting Nmap 7.95 ( https://nmap.org ) at 2025-04-01 05:03 IST
Nmap scan report for localhost (127.0.0.1)
Host is up.
Other addresses for localhost (not scanned): ::1
Nmap done: 1 IP address (1 host up) scanned in 0.02 seconds
```

- `-Pn` - Disables host discovery (treats all hosts as online )

Nmap won’t scan a target that wasn’t found in the host discovery phase. If you suspect a target is blocking Nmap’s host discovery probes, tell Nmap to skip discovery and dive straight at those ports.


## fingerprint Operating system & Services 

- `-0' - Detect the OS ruuning on the hosy 

```
sudo nmap -O --osscan-guess localhost 
Starting Nmap 7.95 ( https://nmap.org ) at 2025-04-01 05:10 IST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.00011s latency).
Other addresses for localhost (not scanned): ::1
Not shown: 989 closed tcp ports (reset)
PORT      STATE SERVICE
21/tcp    open  ftp
80/tcp    open  http
2222/tcp  open  EtherNetIP-1
3306/tcp  open  mysql
5000/tcp  open  upnp
5678/tcp  open  rrac
7000/tcp  open  afs3-fileserver
9010/tcp  open  sdr
9080/tcp  open  glrpc
9100/tcp  open  jetdirect
49152/tcp open  unknown
Device type: general purpose
Running: Apple macOS 12.X
OS CPE: cpe:/o:apple:mac_os_x:12
OS details: Apple macOS 12 (Monterey) (Darwin 21.1.0 - 21.6.0)
Network Distance: 0 hops

OS detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 1.63 seconds
```

sV - Detect the network service and version running on a host’s open ports.

This provides some additional information about the host operating system, though the primary aim is to identify vulnerable services (for patching or exploiting, depending on your role)

```
sudo nmap -sV localhost
Starting Nmap 7.95 ( https://nmap.org ) at 2025-04-01 05:11 IST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.000050s latency).
Other addresses for localhost (not scanned): ::1
Not shown: 989 closed tcp ports (reset)
PORT      STATE SERVICE        VERSION
21/tcp    open  ftp            vsftpd 2.0.8 or later
80/tcp    open  http           nginx 1.27.4
2222/tcp  open  ssh            OpenSSH 9.9 (protocol 2.0)
3306/tcp  open  mysql          MariaDB 11.7.2
5000/tcp  open  rtsp
5678/tcp  open  rrac?
7000/tcp  open  rtsp
9010/tcp  open  websocket      WebSocket++ 0.8.2
9080/tcp  open  glrpc?
9100/tcp  open  jetdirect?
49152/tcp open  bandwidth-test MikroTik bandwidth-test server
4 services unrecognized despite returning data. If you know the service/version, please submit the following fingerprints at https://nmap.org/cgi-bin/submit.cgi?new-service :
==============NEXT SERVICE FINGERPRINT (SUBMIT INDIVIDUALLY)==============
SF-Port5000-TCP:V=7.95%I=7%D=4/1%Time=67EB2828%P=arm-apple-darwin24.2.0%r(
SF:GetRequest,8E,"HTTP/1\.1\x20403\x20Forbidden\r\nContent-Length:\x200\r\
SF:nServer:\x20AirTunes/845\.5\.1\r\nX-Apple-ProcessingTime:\x200\r\nX-App
SF:le-RequestReceivedTimestamp:\x2010396788\r\n\r\n")%r(RTSPRequest,8E,"RT
SF:SP/1\.0\x20403\x20Forbidden\r\nContent-Length:\x200\r\nServer:\x20AirTu
SF:nes/845\.5\.1\r\nX-Apple-ProcessingTime:\x200\r\nX-Apple-RequestReceive
SF:dTimestamp:\x2010396793\r\n\r\n")%r(HTTPOptions,8E,"HTTP/1\.1\x20403\x2
SF:0Forbidden\r\nContent-Length:\x200\r\nServer:\x20AirTunes/845\.5\.1\r\n
SF:X-Apple-ProcessingTime:\x200\r\nX-Apple-RequestReceivedTimestamp:\x2010
SF:401800\r\n\r\n")%r(FourOhFourRequest,8E,"HTTP/1\.1\x20403\x20Forbidden\
SF:r\nContent-Length:\x200\r\nServer:\x20AirTunes/845\.5\.1\r\nX-Apple-Pro
SF:cessingTime:\x200\r\nX-Apple-RequestReceivedTimestamp:\x2010401803\r\n\
SF:r\n")%r(SIPOptions,A0,"RTSP/1\.0\x20403\x20Forbidden\r\nContent-Length:
SF:\x200\r\nServer:\x20AirTunes/845\.5\.1\r\nCSeq:\x2042\x20OPTIONS\r\nX-A
SF:pple-ProcessingTime:\x200\r\nX-Apple-RequestReceivedTimestamp:\x2010401
SF:807\r\n\r\n");
==============NEXT SERVICE FINGERPRINT (SUBMIT INDIVIDUALLY)==============
SF-Port5678-TCP:V=7.95%I=7%D=4/1%Time=67EB282D%P=arm-apple-darwin24.2.0%r(
SF:GetRequest,8DC,"HTTP/1\.1\x20200\x20OK\r\nAccept-Ranges:\x20bytes\r\nCa
SF:che-Control:\x20public,\x20max-age=86400\r\nLast-Modified:\x20Mon,\x203
SF:1\x20Mar\x202025\x2022:12:04\x20GMT\r\nETag:\x20W/\"7b7-195ee43047b\"\r
SF:\nContent-Type:\x20text/html;\x20charset=UTF-8\r\nContent-Length:\x2019
SF:75\r\nVary:\x20Accept-Encoding\r\nDate:\x20Mon,\x2031\x20Mar\x202025\x2
SF:023:41:33\x20GMT\r\nConnection:\x20close\r\n\r\n<!DOCTYPE\x20html>\n<ht
SF:ml\x20lang=\"en\">\n\t<head>\n\t\t<script\x20type=\"module\"\x20crossor
SF:igin\x20src=\"/assets/polyfills-C7eMRNFe\.js\"></script>\n\n\t\t<meta\x
SF:20charset=\"utf-8\"\x20/>\n\t\t<meta\x20http-equiv=\"X-UA-Compatible\"\
SF:x20content=\"IE=edge\"\x20/>\n\t\t<meta\x20name=\"viewport\"\x20content
SF:=\"width=device-width,initial-scale=1\.0\"\x20/>\n\t\t<link\x20rel=\"ic
SF:on\"\x20href=\"/favicon\.ico\"\x20/>\n\t\t<style>@media\x20\(prefers-co
SF:lor-scheme:\x20dark\)\x20{\x20body\x20{\x20background-color:\x20rgb\(45
SF:,\x2046,\x2046\)\x20}\x20}</style>\n\t\t<script\x20type=\"text/javascri
SF:pt\">\n\t\t\twindow\.BASE_PATH\x20=\x20'/';\n\t\t\twindow\.REST_ENDPOIN
SF:T\x20=\x20'rest';\n\t\t</script>\n\t\t<script\x20src=\"/rest/sentry\.js
SF:\"></script>\n\t\t<script>!function\(t,e\){var\x20o,n,")%r(HTTPOptions,
SF:183,"HTTP/1\.1\x20404\x20Not\x20Found\r\nContent-Security-Policy:\x20de
SF:fault-src\x20'none'\r\nX-Content-Type-Options:\x20nosniff\r\nContent-Ty
SF:pe:\x20text/html;\x20charset=utf-8\r\nContent-Length:\x20143\r\nVary:\x
SF:20Accept-Encoding\r\nDate:\x20Mon,\x2031\x20Mar\x202025\x2023:41:33\x20
SF:GMT\r\nConnection:\x20close\r\n\r\n<!DOCTYPE\x20html>\n<html\x20lang=\"
SF:en\">\n<head>\n<meta\x20charset=\"utf-8\">\n<title>Error</title>\n</hea
SF:d>\n<body>\n<pre>Cannot\x20OPTIONS\x20/</pre>\n</body>\n</html>\n")%r(R
SF:TSPRequest,183,"HTTP/1\.1\x20404\x20Not\x20Found\r\nContent-Security-Po
SF:licy:\x20default-src\x20'none'\r\nX-Content-Type-Options:\x20nosniff\r\
SF:nContent-Type:\x20text/html;\x20charset=utf-8\r\nContent-Length:\x20143
SF:\r\nVary:\x20Accept-Encoding\r\nDate:\x20Mon,\x2031\x20Mar\x202025\x202
SF:3:41:33\x20GMT\r\nConnection:\x20close\r\n\r\n<!DOCTYPE\x20html>\n<html
SF:\x20lang=\"en\">\n<head>\n<meta\x20charset=\"utf-8\">\n<title>Error</ti
SF:tle>\n</head>\n<body>\n<pre>Cannot\x20OPTIONS\x20/</pre>\n</body>\n</ht
SF:ml>\n");
==============NEXT SERVICE FINGERPRINT (SUBMIT INDIVIDUALLY)==============
SF-Port7000-TCP:V=7.95%I=7%D=4/1%Time=67EB282D%P=arm-apple-darwin24.2.0%r(
SF:RTSPRequest,8E,"RTSP/1\.0\x20403\x20Forbidden\r\nContent-Length:\x200\r
SF:\nServer:\x20AirTunes/845\.5\.1\r\nX-Apple-ProcessingTime:\x200\r\nX-Ap
SF:ple-RequestReceivedTimestamp:\x2010396766\r\n\r\n")%r(GetRequest,8E,"HT
SF:TP/1\.1\x20403\x20Forbidden\r\nContent-Length:\x200\r\nServer:\x20AirTu
SF:nes/845\.5\.1\r\nX-Apple-ProcessingTime:\x200\r\nX-Apple-RequestReceive
SF:dTimestamp:\x2010401772\r\n\r\n")%r(HTTPOptions,8E,"HTTP/1\.1\x20403\x2
SF:0Forbidden\r\nContent-Length:\x200\r\nServer:\x20AirTunes/845\.5\.1\r\n
SF:X-Apple-ProcessingTime:\x200\r\nX-Apple-RequestReceivedTimestamp:\x2010
SF:401780\r\n\r\n")%r(FourOhFourRequest,8E,"HTTP/1\.1\x20403\x20Forbidden\
SF:r\nContent-Length:\x200\r\nServer:\x20AirTunes/845\.5\.1\r\nX-Apple-Pro
SF:cessingTime:\x200\r\nX-Apple-RequestReceivedTimestamp:\x2010401784\r\n\
SF:r\n")%r(SIPOptions,A0,"RTSP/1\.0\x20403\x20Forbidden\r\nContent-Length:
SF:\x200\r\nServer:\x20AirTunes/845\.5\.1\r\nCSeq:\x2042\x20OPTIONS\r\nX-A
SF:pple-ProcessingTime:\x201\r\nX-Apple-RequestReceivedTimestamp:\x2010401
SF:787\r\n\r\n");
==============NEXT SERVICE FINGERPRINT (SUBMIT INDIVIDUALLY)==============
SF-Port9080-TCP:V=7.95%I=7%D=4/1%Time=67EB2828%P=arm-apple-darwin24.2.0%r(
SF:GetRequest,9C,"HTTP/1\.0\x20404\x20Not\x20Found\r\nContent-Length:\x208
SF:5\r\nContent-Type:\x20text/html\r\n\r\n<html><head><title>Not\x20Found<
SF:/title></head><body><h1>404\x20Not\x20Found</h1></body></html>")%r(Gene
SF:ricLines,A2,"HTTP/1\.0\x20400\x20Bad\x20Request\r\nContent-Length:\x208
SF:9\r\nContent-Type:\x20text/html\r\n\r\n<html><head><title>Bad\x20Reques
SF:t</title></head><body><h1>400\x20Bad\x20Request</h1></body></html>")%r(
SF:HTTPOptions,9C,"HTTP/1\.0\x20404\x20Not\x20Found\r\nContent-Length:\x20
SF:85\r\nContent-Type:\x20text/html\r\n\r\n<html><head><title>Not\x20Found
SF:</title></head><body><h1>404\x20Not\x20Found</h1></body></html>")%r(RTS
SF:PRequest,A2,"HTTP/1\.0\x20400\x20Bad\x20Request\r\nContent-Length:\x208
SF:9\r\nContent-Type:\x20text/html\r\n\r\n<html><head><title>Bad\x20Reques
SF:t</title></head><body><h1>400\x20Bad\x20Request</h1></body></html>")%r(
SF:RPCCheck,A2,"HTTP/1\.0\x20400\x20Bad\x20Request\r\nContent-Length:\x208
SF:9\r\nContent-Type:\x20text/html\r\n\r\n<html><head><title>Bad\x20Reques
SF:t</title></head><body><h1>400\x20Bad\x20Request</h1></body></html>")%r(
SF:DNSVersionBindReqTCP,A2,"HTTP/1\.0\x20400\x20Bad\x20Request\r\nContent-
SF:Length:\x2089\r\nContent-Type:\x20text/html\r\n\r\n<html><head><title>B
SF:ad\x20Request</title></head><body><h1>400\x20Bad\x20Request</h1></body>
SF:</html>")%r(DNSStatusRequestTCP,A2,"HTTP/1\.0\x20400\x20Bad\x20Request\
SF:r\nContent-Length:\x2089\r\nContent-Type:\x20text/html\r\n\r\n<html><he
SF:ad><title>Bad\x20Request</title></head><body><h1>400\x20Bad\x20Request<
SF:/h1></body></html>")%r(Help,A2,"HTTP/1\.0\x20400\x20Bad\x20Request\r\nC
SF:ontent-Length:\x2089\r\nContent-Type:\x20text/html\r\n\r\n<html><head><
SF:title>Bad\x20Request</title></head><body><h1>400\x20Bad\x20Request</h1>
SF:</body></html>")%r(SSLSessionReq,A2,"HTTP/1\.0\x20400\x20Bad\x20Request
SF:\r\nContent-Length:\x2089\r\nContent-Type:\x20text/html\r\n\r\n<html><h
SF:ead><title>Bad\x20Request</title></head><body><h1>400\x20Bad\x20Request
SF:</h1></body></html>")%r(TerminalServerCookie,A2,"HTTP/1\.0\x20400\x20Ba
SF:d\x20Request\r\nContent-Length:\x2089\r\nContent-Type:\x20text/html\r\n
SF:\r\n<html><head><title>Bad\x20Request</title></head><body><h1>400\x20Ba
SF:d\x20Request</h1></body></html>");
Service Info: Host: Welcome

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 18.70 seconds
```


Timing

The following options can be used to control the speed of your Nmap scan.

-T1-5 - Timing templates for adjusting your scan speed. These templates are categorized as Paranoid (0) | Sneaky (1) | Polite (2) | Normal (3) | Aggressive (4) | Insane (5).

The default is Normal (3). You may want to speed up your scan because you’re impatient (T5 - insane!) or slow it right down so that you don’t trip any filters that will give you a bad read (T0 - paranoid...).


