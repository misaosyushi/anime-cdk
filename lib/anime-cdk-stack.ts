import * as cdk from '@aws-cdk/core';
import * as ecs from "@aws-cdk/aws-ecs";
import * as elb from "@aws-cdk/aws-elasticloadbalancingv2";

export class AnimeCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ECS クラスタの定義
    const cluster = new ecs.Cluster(this, "AniWebCluster", {
      clusterName: "AniWebCluster"
    });

    // ECSタスクの定義
    const taskDefinition = new ecs.FargateTaskDefinition(this, "TaskDef");

    // ECSタスクの詳細設定
    const container = taskDefinition.addContainer("DefaultContainer", {
      image: ecs.ContainerImage.fromAsset("./app"),
      memoryLimitMiB: 512,
      cpu: 256
    });

    // ポートのマッピング
    container.addPortMappings({
      containerPort: 8080
    });

    // ECSのサービスの定義
    const ecsService = new ecs.FargateService(this, "Service", {
      cluster,
      taskDefinition,
      desiredCount: 1
    });

    // ALBの定義
    const lb = new elb.ApplicationLoadBalancer(this, "LB", {
      vpc: cluster.vpc,
      internetFacing: true
    });

    // ALBのリスナーを定義
    const listener = lb.addListener("Listener", { port: 80 });

    // ALBのターゲットを定義
    const targetGroup = listener.addTargets("ECS", {
      protocol: elb.ApplicationProtocol.HTTP,
      port: 8080,
      targets: [ecsService]
    });

    // 作成されたロードバランサのDNS名を表示
    new cdk.CfnOutput(this, "LoadBalancerDNS", {
      value: lb.loadBalancerDnsName
    });
  }
}
