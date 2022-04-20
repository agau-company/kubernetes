let json = {
  "result": 0,
  "settings": {
    "onBeforeInit": "return settings;",
    "fields": [
      {
        "type": "compositefield",
        "caption": "Version",
        "defaultMargins": "0 10 0 0",
        "items": [
          {
            "type": "list",
            "name": "version",
            "values": [
              {
                "value": "v1.23.4",
                "caption": "v1.23.4"
              },
              {
                "value": "v1.22.6",
                "caption": "v1.22.6"
              },
              {
                "value": "v1.21.10",
                "caption": "v1.21.10"
              }
            ],
            "default": "v1.22.6",
            "hideLabel": false,
            "editable": true,
            "width": 155,
            "disabled": false
          },
          {
            "type": "displayfield",
            "markup": "K8s Dashboard",
            "width": 113,
            "cls": "x-form-item-label",
            "margins": "0 11 0 0",
            "disabled": false
          },
          {
            "name": "dashboard",
            "type": "list",
            "width": 155,
            "values": {
              "general": "v2",
              "k8dash": "Skooner"
            },
            "default": "general",
            "hideLabel": false,
            "editable": true,
            "disabled": false
          }
        ]
      },
      {
        "type": "compositefield",
        "caption": "Topology",
        "defaultMargins": "0 10 0 0",
        "items": [
          {
            "name": "topo",
            "type": "list",
            "value": "0-dev",
            "width": 155,
            "values": [
              {
                "value": "0-dev",
                "caption": "Development",
                "tooltip": "One control-plane (1) and one scalable worker (1+)"
              },
              {
                "value": "1-prod",
                "caption": "Production",
                "tooltip": "Multi control-plane (3) with API balancers (2+) and scalable workers (2+)"
              }
            ],
            "disabled": false
          },
          {
            "type": "displayfield",
            "markup": "Ingress Controller",
            "cls": "x-form-item-label",
            "width": 113,
            "margins": "0 11 0 0",
            "disabled": false
          },
          {
            "name": "ingress-controller",
            "type": "list",
            "width": 155,
            "margins": "0 10 0 0",
            "values": {
              "Nginx": "NGINX",
              "HAProxy": "HAProxy",
              "Traefik": "Traefik"
            },
            "default": "Nginx",
            "hideLabel": false,
            "editable": true,
            "disabled": false
          }
        ]
      },
      {
        "type": "displayfield",
        "cls": "warning",
        "height": 60,
        "hideLabel": true,
        "hidden": false,
        "markup": "Production and Development topologies are not available for trial account. Please upgrade your account.",
        "disabled": false
      },
      {
        "name": "deploy",
        "type": "radiolist",
        "caption": "Deployment",
        "columns": 3,
        "values": [
          {
            "value": "cc",
            "caption": "Clean cluster",
            "tooltip": {
              "text": "Clean cluster with pre-deployed HelloWorld example",
              "maxWidth": 210,
              "y": -1
            }
          },
          {
            "value": "cmd",
            "caption": "Custom",
            "tooltip": {
              "text": "Deploy custom helm or stack via shell command",
              "maxWidth": 165,
              "y": -1
            }
          }
        ],
        "default": "cc",
        "showIf": {
          "cmd": {
            "name": "cmd",
            "type": "text",
            "height": 65,
            "required": true,
            "hideLabel": true,
            "default": "OPERATOR_NAMESPACE=open-liberty\nkubectl create namespace \"$OPERATOR_NAMESPACE\"\nkubectl apply -f https://raw.githubusercontent.com/OpenLiberty/open-liberty-operator/main/deploy/releases/0.8.0/kubectl/openliberty-app-crd.yaml\ncurl -L https://raw.githubusercontent.com/OpenLiberty/open-liberty-operator/main/deploy/releases/0.8.0/kubectl/openliberty-app-rbac-watch-another.yaml | sed -e \"s/OPEN_LIBERTY_OPERATOR_NAMESPACE/${OPERATOR_NAMESPACE}/\" | sed -e \"s/OPEN_LIBERTY_WATCH_NAMESPACE/${OPERATOR_NAMESPACE}/\" | kubectl apply -f -\ncurl -L https://raw.githubusercontent.com/OpenLiberty/open-liberty-operator/main/deploy/releases/0.8.0/kubectl/openliberty-app-operator.yaml | sed -e \"s/OPEN_LIBERTY_WATCH_NAMESPACE/${OPERATOR_NAMESPACE}/\" | kubectl apply -n ${OPERATOR_NAMESPACE} -f -\nkubectl apply -f https://raw.githubusercontent.com/jelastic-jps/kubernetes/main/addons/open-liberty.yaml"
          }
        },
        "disabled": false
      },
      {
        "type": "toggle",
        "name": "storage",
        "caption": "NFS Storage",
        "tooltip": "Attach dedicated NFS Storage with dynamic volume provisioning",
        "value": false,
        "default": false,
        "showIf": {
          "true": [
            {
              "type": "compositefield",
              "caption": "Modules",
              "pack": "start",
              "items": [
                {
                  "type": "checkbox",
                  "name": "monitoring",
                  "caption": "Prometheus & Grafana",
                  "width": 170
                },
                {
                  "type": "checkbox",
                  "name": "jaeger",
                  "caption": "Jaeger Tracing Tools",
                  "margins": "0 0 0 25",
                  "width": 170
                }
              ]
            }
          ],
          "false": [
            {
              "type": "compositefield",
              "caption": "Modules",
              "pack": "start",
              "items": [
                {
                  "type": "checkbox",
                  "name": "monitoring",
                  "caption": "Prometheus & Grafana",
                  "value": false,
                  "disabled": false,
                  "width": 170
                },
                {
                  "type": "checkbox",
                  "name": "jaeger",
                  "caption": "Jaeger Tracing Tools",
                  "value": false,
                  "disabled": false,
                  "margins": "0 0 0 25",
                  "width": 170
                }
              ]
            }
          ]
        },
        "disabled": false
      },
      {
        "type": "compositefield",
        "pack": "start",
        "items": [
          {
            "type": "checkbox",
            "name": "api",
            "caption": "Remote API Access",
            "value": false,
            "width": 170,
            "disabled": false
          }
        ]
      },
      {
        "type": "displayfield",
        "height": 10,
        "hideLabel": true,
        "markup": null,
        "disabled": false
      },
      {
        "type": "envname",
        "name": "envName",
        "caption": "Environment",
        "dependsOn": "region",
        "randomName": true,
        "showFullDomain": true,
        "required": true,
        "disabled": false
      },
      {
        "type": "string",
        "name": "displayName",
        "caption": "Display Name",
        "default": "Kubernetes Cluster",
        "disabled": false
      },
      {
        "type": "regionlist",
        "name": "region",
        "caption": "Region",
        "disableInactive": true,
        "selectFirstAvailable": true,
        "filter": {
          "type": [
            "vz7"
          ],
          "isActive": true
        },
        "disabled": false
      },
      {
        "type": "compositefield",
        "height": 0,
        "hideLabel": true,
        "width": 0,
        "items": [
          {
            "height": 0,
            "type": "string",
            "required": true
          }
        ]
      }
    ]
  }
}