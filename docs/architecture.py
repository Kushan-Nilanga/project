from diagrams import Cluster, Diagram, Edge

from diagrams.aws.compute import ElasticKubernetesService as Eks
from diagrams.aws.compute import EC2ContainerRegistry as Ecr
from diagrams.k8s.compute import Pod
from diagrams.aws.database import Dynamodb
from diagrams.aws.security import Cognito
from diagrams.aws.network import APIGateway
from diagrams.aws.devtools import Codebuild
from diagrams.aws.devtools import Codepipeline
from diagrams.aws.general import Client
from diagrams.aws.management import Cloudwatch

with Diagram("Architecture", filename="architecture", show=False):
    user = Client("User")

        
    with Cluster("AWS (ap-southeast-2)"):
        # compute
        registry = Ecr("Registry")

        # database
        database = Dynamodb("Database")
        user_pool = Cognito("User Pool")

        # users
        api = APIGateway("API Gateway")

        # ci/cd
        build = Codebuild("Build")
        pipeline = Codepipeline("Pipeline")

        # logging and monitoring
        cloudwatch = Cloudwatch("Cloudwatch")

        with Cluster("EKS Cluster Namespace") as compute:
            kube = Eks("EKS Cluster")
            nginx = Pod("Nginx")
            notes_service = Pod("Notes Service")
            auth_service = Pod("Auth Service")
            frontend_service = Pod("Frontend Service")

        kube >> Edge(label="HTTP") >> cloudwatch

        api >> Edge(label="HTTP") >> nginx
        nginx >> Edge(label="HTTPS") >> [notes_service, auth_service, frontend_service]

        notes_service >> Edge(label="HTTP") >> database
        auth_service >> Edge(label="HTTP") >> user_pool

        # ci/cd
        pipeline >> Edge(label="Docker Image") >> build
        build >> Edge(label="Docker Image") >> registry

        # ci/cd
        pipeline >> Edge(label="Kubernetes Manifest") >> kube
        kube >> registry
    
    user >> Edge(label="HTTP") >> api


