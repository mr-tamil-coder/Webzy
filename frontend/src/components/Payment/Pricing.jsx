import React, { useState, useEffect } from "react";

const PricingGateway = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(null);
  const [activatedPlans, setActivatedPlans] = useState(new Set());
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  // In a real app, get this from environment variables
  const payPalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  const plans = [
    {
      id: "free",
      name: "Free",
      tokens: "50K Tokens",
      price: "$0.00",
      numericPrice: "0.00",
      description:
        "Ideal for hobbyists and casual users for light, exploratory use.",
      buttonText: "Get Started Free",
      popular: false,
      isFree: true,
    },
    {
      id: "starter",
      name: "Starter",
      tokens: "120K Tokens",
      price: "$9.99",
      numericPrice: "9.99",
      description:
        "Designed for professionals who need to use Bolt a few times per week.",
      buttonText: "Upgrade to Starter",
      popular: false,
      isFree: false,
    },
    {
      id: "pro",
      name: "Pro",
      tokens: "2.5M Tokens",
      price: "$19.99",
      numericPrice: "19.99",
      description:
        "Perfect for regular users who need more tokens for their projects.",
      buttonText: "Upgrade to Pro",
      popular: true,
      isFree: false,
    },
    {
      id: "unlimited",
      name: "Unlimited",
      subtitle: "(License)",
      tokens: "Unlimited Tokens",
      price: "$49.99",
      numericPrice: "49.99",
      description:
        "For power users and teams who need unlimited access to Bolt.",
      buttonText: "Upgrade to Unlimited",
      popular: false,
      isFree: false,
    },
  ];

  // Load PayPal SDK once at component mount
  useEffect(() => {
    if (
      !window.paypal &&
      payPalClientId &&
      payPalClientId !== "YOUR_PAYPAL_CLIENT_ID"
    ) {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${payPalClientId}&currency=USD`;
      script.async = true;
      script.onload = () => {
        setPaypalLoaded(true);
      };
      script.onerror = () => {
        console.error("Failed to load PayPal SDK");
      };
      document.head.appendChild(script);
    } else if (window.paypal) {
      setPaypalLoaded(true);
    }
  }, [payPalClientId]);

  const handleUpgrade = (planId) => {
    const plan = plans.find((p) => p.id === planId);
    if (plan?.isFree) {
      setSelectedPlan(planId);
      console.log(`Activating free plan: ${planId}`);

      // Simulate API call
      setTimeout(() => {
        setSelectedPlan(null);
        setActivatedPlans((prev) => new Set([...prev, planId]));
        alert("Free plan activated successfully!");
      }, 1500);
    }
  };

  const handlePayPalSuccess = async (details, data, planId) => {
    console.log("Payment successful:", details);
    setProcessingPayment(null);

    try {
      // TODO: Replace with actual API call
      const response = await fetch("/api/credit-tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          transactionId: details.id,
          payerId: details.payer.payer_id,
          amount: details.purchase_units[0].amount.value,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setActivatedPlans((prev) => new Set([...prev, planId]));
        alert(
          `Payment successful! ${
            result.message || "Tokens added to your account."
          }`
        );
      } else {
        throw new Error("Failed to process payment on server");
      }
    } catch (error) {
      console.error("Backend error:", error);
      alert(
        "Payment successful, but there was an issue updating your account. Please contact support."
      );
    }
  };

  const handlePayPalError = (err, planId) => {
    console.error("Payment error:", err);
    setProcessingPayment(null);
    alert("Payment failed. Please try again.");
  };

  const handlePayPalCancel = (data, planId) => {
    console.log("Payment cancelled:", data);
    setProcessingPayment(null);
    alert("Payment was cancelled.");
  };

  // PayPal Button Component
  const PayPalButton = ({ plan }) => {
    useEffect(() => {
      if (paypalLoaded && window.paypal) {
        renderPayPalButton(plan);
      }
    }, [paypalLoaded, plan]);

    const renderPayPalButton = (plan) => {
      const buttonContainer = document.getElementById(
        `paypal-button-${plan.id}`
      );
      if (buttonContainer && window.paypal) {
        // Clear existing buttons
        buttonContainer.innerHTML = "";

        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              setProcessingPayment(plan.id);
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: parseFloat(plan.numericPrice).toFixed(2),
                      currency_code: "USD",
                    },
                    description: `${plan.name} Plan - ${plan.tokens}`,
                  },
                ],
              });
            },
            onApprove: (data, actions) => {
              return actions.order.capture().then((details) => {
                handlePayPalSuccess(details, data, plan.id);
              });
            },
            onError: (err) => {
              handlePayPalError(err, plan.id);
            },
            onCancel: (data) => {
              handlePayPalCancel(data, plan.id);
            },
            style: {
              layout: "vertical",
              color: "blue",
              shape: "rect",
              label: "paypal",
              height: 40,
            },
          })
          .render(`#paypal-button-${plan.id}`);
      }
    };

    return (
      <div className="mb-3">
        {paypalLoaded ? (
          <div
            id={`paypal-button-${plan.id}`}
            className="paypal-button-container"
          />
        ) : (
          <div className="bg-gray-700 rounded p-3 text-center text-sm text-gray-400">
            Loading PayPal...
          </div>
        )}
      </div>
    );
  };

  const renderPlanButton = (plan) => {
    const isActivated = activatedPlans.has(plan.id);
    const isProcessing =
      selectedPlan === plan.id || processingPayment === plan.id;

    if (isActivated) {
      return (
        <div className="w-full py-3 px-4 rounded-lg font-semibold bg-green-600 text-white text-center">
          ✅ {plan.isFree ? "Free Plan" : "Plan"} Activated
        </div>
      );
    }

    return (
      <button
        onClick={() => handleUpgrade(plan.id)}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
          plan.popular
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : plan.isFree
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-gray-700 hover:bg-gray-600 text-white"
        } ${isProcessing ? "opacity-75 cursor-not-allowed" : ""}`}
        disabled={isProcessing}
      >
        {selectedPlan === plan.id
          ? "Processing..."
          : processingPayment === plan.id
          ? "Payment Processing..."
          : plan.buttonText}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6">Pricing</h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Start with a free account to speed up your workflow on public
            projects or boost your entire team with instantly-opening production
            environments.
          </p>
        </div>

        {/* Tokens Left Display */}
        <div className="flex justify-between items-center mb-12 bg-gray-900 rounded-lg p-4">
          <div className="text-xl font-semibold">999,542 Tokens Left</div>
          <div className="text-right">
            <div className="text-gray-400 text-sm">Need more tokens?</div>
            <div className="text-white text-sm">Upgrade your plan below</div>
          </div>
        </div>

        {/* PayPal Client ID Warning */}
        {payPalClientId === "YOUR_PAYPAL_CLIENT_ID" && (
          <div className="mb-6 bg-yellow-900 border border-yellow-600 rounded-lg p-4">
            <p className="text-yellow-200 text-sm">
              ⚠️ PayPal Client ID not configured. Replace
              "YOUR_PAYPAL_CLIENT_ID" with your actual PayPal client ID.
            </p>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-gray-900 rounded-lg p-6 relative transition-all duration-300 hover:scale-105 ${
                plan.popular ? "ring-2 ring-blue-500" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">
                  {plan.name}
                  {plan.subtitle && (
                    <span className="text-lg font-normal text-gray-400 ml-1">
                      {plan.subtitle}
                    </span>
                  )}
                </h3>
                <div className="text-lg font-semibold text-gray-300 mb-4">
                  {plan.tokens}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold mb-6">{plan.price}</div>

                {/* PayPal Payment Section for paid plans */}
                {!plan.isFree && !activatedPlans.has(plan.id) && (
                  <PayPalButton plan={plan} />
                )}

                {/* Plan Button */}
                <div className="mt-3">{renderPlanButton(plan)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Notice */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            This is a demo component. In production, replace API endpoints and
            PayPal client ID with real values.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingGateway;
