import { motion } from 'framer-motion';
import { Check, Shield, Star, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Plan } from '@/types/subscription';

interface SubscriptionModalPlanProps {
  plan: Plan;
  isLoading: boolean;
  razorpayLoaded: boolean;
  getButtonText: () => string;
  handleSubscribe: () => void;
}

export function SubscriptionModalPlan({
  plan,
  isLoading,
  razorpayLoaded,
  getButtonText,
  handleSubscribe,
}: SubscriptionModalPlanProps) {
  return (
    <div className="flex flex-col p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-blue-500 bg-blue-50/50 dark:bg-blue-950/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-base">
                  {plan.name}
                  <Badge className="bg-blue-500 text-xs text-white">Most Popular</Badge>
                </CardTitle>
                <CardDescription className="mt-1 text-xs">Billed monthly</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900 dark:text-white">₹{plan.price}</div>
                <div className="text-xs text-gray-500">per month</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-1">
              {plan.features.slice(0, 4).map((feature, featureIndex) => (
                <motion.li
                  key={featureIndex}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.3 + featureIndex * 0.05,
                  }}
                  className="flex items-center gap-2 text-xs"
                >
                  <Check className="h-3 w-3 text-green-500" />
                  {feature}
                </motion.li>
              ))}
              {plan.features.length > 4 && (
                <motion.li
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + 4 * 0.05 }}
                  className="flex items-center gap-2 text-xs text-gray-500"
                >
                  <Check className="h-3 w-3 text-green-500" />+{plan.features.length - 4} more
                  features
                </motion.li>
              )}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-3 rounded-lg bg-gray-50 p-2 dark:bg-gray-800"
      >
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>4.9/5 from 2,000+ users</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            <span>SSL Secured</span>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-4 space-y-2"
      >
        <Button
          onClick={handleSubscribe}
          disabled={isLoading || !razorpayLoaded}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-2.5 font-semibold text-white hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
          size="lg"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span className="text-sm">Processing...</span>
            </div>
          ) : !razorpayLoaded ? (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span className="text-sm">Loading...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm">{getButtonText()}</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          )}
        </Button>
        <div className="text-center text-xs text-gray-500">
          🔒 Secure payment • Cancel anytime • 30-day money-back guarantee
        </div>
      </motion.div>
    </div>
  );
}
