curl --request POST \
	--url 'http://127.0.0.1:8787/mainnet/0xf4212614C7Fe0B3feef75057E88b2E77a7E23e83' \
	--header 'content-type: application/json' \
	--data '["0x7aE1D57b58fA6411F32948314BadD83583eE0e8C"]'

curl --request GET \
	--url 'http://127.0.0.1:8787/mainnet/0xf4212614C7Fe0B3feef75057E88b2E77a7E23e83' \
	--header 'content-type: application/json'
