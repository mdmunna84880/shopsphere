/** @format */

import React from "react";

// Lucide Icons
import {
  LuMail,
  LuLock,
  LuSearch,
  LuUser,
} from "react-icons/lu";

// Material Icons (Stable Status/System)
import {
  MdCheckCircle,
  MdErrorOutline,
  MdSettings,
} from "react-icons/md";

import Input from "components/ui/Input";
import Button from "components/ui/Button";

export default function InputGallery() {
  return (
    <div className="p-10 bg-gray-50 min-h-screen space-y-12">

      {/* Header */}
      <header className="border-b border-subtle pb-4">
        <h1 className="text-3xl font-bold text-main">
          Input Design System
        </h1>

        <p className="text-muted">
          Reusable, scalable, and accessible React inputs with React Icons.
        </p>
      </header>

      {/* 1. Visual Style Variants */}
      <section className="space-y-6">

        <h2 className="text-xl font-semibold text-main">
          Visual Variants
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <Input
            label="Primary (Default)"
            placeholder="Standard input..."
            variant="primary"
          />

          <Input
            label="Secondary"
            placeholder="Secondary background..."
            variant="secondary"
          />

          <Input
            label="Ghost"
            placeholder="Minimalist style..."
            variant="ghost"
          />

        </div>
      </section>

      {/* 2. Status & Validation Variants */}
      <section className="space-y-6">

        <h2 className="text-xl font-semibold text-main">
          Status & Validation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Success */}
          <Input
            label="Success State"
            variant="success"
            defaultValue="valid_username"
            rightIcon={
              <MdCheckCircle
                size={18}
                className="text-accent"
              />
            }
          />

          {/* Error */}
          <Input
            label="Error State"
            variant="error"
            error="This field is required"
            leftIcon={
              <MdErrorOutline size={18} />
            }
          />

          {/* Disabled */}
          <Input
            label="Disabled State"
            variant="disabled"
            value="Locked content"
            readOnly
          />

        </div>
      </section>

      {/* 3. Sizing Variants */}
      <section className="space-y-6">

        <h2 className="text-xl font-semibold text-main">
          Sizes
        </h2>

        <div className="flex flex-col gap-4 max-w-md">

          <Input
            size="sm"
            placeholder="Small (sm) - 32px"
            variant="primary"
          />

          <Input
            size="md"
            placeholder="Medium (md) - 40px"
            variant="primary"
          />

          <Input
            size="lg"
            placeholder="Large (lg) - 48px"
            variant="primary"
          />

        </div>
      </section>

      {/* 4. Complex Functional Examples */}
      <section className="space-y-6">

        <h2 className="text-xl font-semibold text-main">
          Functional Use Cases
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Login Use Case */}
          <div className="p-6 bg-white border border-subtle rounded-xl shadow-sm space-y-4">

            <h3 className="font-medium text-main border-b border-subtle pb-2">
              Login Fields
            </h3>

            <Input
              label="Email"
              type="email"
              leftIcon={<LuMail size={18} />}
              placeholder="email@example.com"
            />

            <Input
              label="Password"
              type="password"
              leftIcon={<LuLock size={18} />}
              placeholder="••••••••"
            />

            <Button
              variant="primary"
              fullWidth
              className="mt-2"
            >
              Sign In
            </Button>

          </div>

          {/* Search / Filter Use Case */}
          <div className="p-6 bg-white border border-subtle rounded-xl shadow-sm space-y-4">

            <h3 className="font-medium text-main border-b border-subtle pb-2">
              Action Group
            </h3>

            <div className="flex items-end gap-2">

              <Input
                label="Search Users"
                placeholder="Name or email..."
                leftIcon={<LuSearch size={18} />}
              />

              <Button variant="outline" size="md">
                <MdSettings size={18} />
              </Button>

            </div>

            <div className="flex gap-2 pt-2">

              <Button
                variant="ghost"
                size="sm"
                leftIcon={<LuUser size={16} />}
              >
                Add Member
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-error hover:bg-error/5"
              >
                Clear All
              </Button>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
