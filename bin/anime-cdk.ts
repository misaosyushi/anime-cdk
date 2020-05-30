#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AnimeCdkStack } from '../lib/anime-cdk-stack';

const app = new cdk.App();
new AnimeCdkStack(app, 'AnimeCdkStack');
