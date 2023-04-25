from diagrams import Cluster, Diagram, Edge

from diagrams.onprem.vcs import Github
from diagrams.aws.compute import EKS
from diagrams.aws.compute import EC2ContainerRegistry as Ecr
from diagrams.k8s.compute import Pod
from diagrams.aws.database import Dynamodb
from diagrams.aws.security import Cognito
from diagrams.aws.network import APIGateway
from diagrams.aws.devtools import Codebuild, Codepipeline
from diagrams.aws.general import Client
from diagrams.aws.management import Cloudwatch
from diagrams.aws.storage import S3
from diagrams.aws.network import ELB

node_attr = {
    "fontcolor": "black",
    "fontname": "Helvetica",
    "fontsize": "10",
    "shape": "rect",
    "width": "1.1",
}

edge_attr = {
    "color": "black"
}

graph_attr = {
    "layout": "dot",
    "compound": "true",
    "rankdir": "LR",
    "splines": "ortho",
    "nodesep": "0.6",
    "ranksep": "1.5",
    "pad": "0.5",
}

with Diagram("Architecture",
             filename="architecture",
             node_attr=node_attr,
             edge_attr=edge_attr,
             graph_attr=graph_attr,
             ):
    with Cluster("Internet"):
        github = Github("Github Repository")
        user = Client("User")
        developer = Client("Developer")

        with Cluster("AWS (ap-southeast-2)"):

            with Cluster("AWS PaaS Services"):
                with Cluster("Datastore"):
                    database = Dynamodb("Database")
                    user_pool = Cognito("User Pool")

                with Cluster("CI/CD"):
                    build = Codebuild("Build")
                    pipeline = Codepipeline("Pipeline")
                    artifacts = S3("Artifacts")
                    registry = Ecr("Registry")

                with Cluster("Monitoring"):
                    cloudwatch = Cloudwatch("Cloudwatch")

            with Cluster("Compute"):
                api = APIGateway("API Gateway")
                lb = ELB("Load Balancer")

                with Cluster("EKS Cluster Namespace") as eks:
                    notes_service = Pod("Notes Service")
                    auth_service = Pod("Auth Service")
                    frontend_service = Pod("Frontend Service")
                    logs_service = Pod("Logs Service")

            lb >> Edge(lhead="cluster_EKS Cluster Namespace",
                       xlabel="http") >> notes_service
            notes_service >> Edge(
                lhead="cluster_EKS Cluster Namespace", xlabel="http") >> registry

            notes_service >> Edge(xlabel="http") >> database
            auth_service >> Edge(xlabel="http") >> user_pool
            logs_service >> Edge(xlabel="http") >> cloudwatch
            api >> Edge(xlabel="http") >> lb

            # ci/cd
            pipeline >> Edge(xlabel="http") >> build
            build >> Edge(xlabel="http") >> registry
            pipeline >> Edge(xlabel="http") >> github
            build >> Edge(xlabel="http") >> cloudwatch
            build >> Edge(xlabel="http") >> artifacts

        user >> Edge(xlabel="http") >> api
        developer >> Edge(xlabel="http") >> github
